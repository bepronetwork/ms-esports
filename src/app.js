import { PORT, QUOTA_GUARD_URL, PUBLIC_KEY } from './config';
import { globals } from './Globals';
import { Logger } from './helpers/logger';
import { IOSingleton } from './logic/utils/io';
import { workConsume, getWorkChannel, ClientQueueSingleton } from './logic/third-parties';

/** MACROS */
const socketIOJwt = require('socketio-jwt');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const expressIp = require('express-ip');
const cors = require('cors');
/** CODE */
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var publicKEY       =  new String("-----BEGIN PUBLIC KEY-----\n" + PUBLIC_KEY + "\n-----END PUBLIC KEY-----").trim();


//---------CODING-CHOICES--------------/
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(expressIp().getIpInfoMiddleware);

//--------RUN APP-------------------//

var config = {
  	appRoot: __dirname // required config
};

SwaggerExpress.create(config, async (err, swaggerExpress) => {
    if (err) { throw err; }
    // set the ENV variables if Production
	// install middleware
	swaggerExpress.register(app);
    globals.verify();
    await globals.__init__();
    const controller = require('./api/controllers/bet');

    // Rabbit queue
    workConsume("createBet", async (msg) => {
        const originMSG = msg;
        msg = JSON.parse(msg.content.toString());
        console.log("msg ", msg );
        let bet = await controller.createBet(msg);
        console.log(bet);
        IOSingleton.getIO().to(`Auth/${msg.user}`).emit("createBetReturn", {...bet, bid: msg.bid});
        getWorkChannel().ack(originMSG);
    });
    workConsume("confirmBet", async (msg) => {
        const originMSG = msg;
        msg = JSON.parse(msg.content.toString());
        let bet = await controller.confirmBets(msg);
        getWorkChannel().ack(originMSG);
    });

    // Setting Socket
    IOSingleton.push(io);
    io.on('connection', socketIOJwt.authorize({
        secret: publicKEY,
        timeout: 15000
    }))
    .on('authenticated', (socket) => {
        socket.join(socket.decoded_token.id);
        socket.on("createBet", (data) => {
            ClientQueueSingleton.sendToQueue("createBet", data);
        });
    });

    http.listen(PORT, async () => {
        Logger.success("Listening in port", PORT);
	});

});

module.exports = app;