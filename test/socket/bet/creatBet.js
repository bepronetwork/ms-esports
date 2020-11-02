import {GlobalESportSingleton} from "../../GlobalESport";
import {
    registerAdmin,
    loginAdmin,
    registerApp,
    registerUser,
    loginUser,
    getEcosystemData,
    addCurrencyWalletToApp
} from '../../methods';
import chai from 'chai';
import { mochaAsync } from '../../utils';
import { SOCKET_HOST, PORT } from "../../../src/config";
import delay from 'delay';

const expect = chai.expect;

context('Create Bet', async () => {
    var admin, user, app, socket;
    before( async () =>  {
        var postDataAdmin = {
            username : "admin1" + parseInt(Math.random()*30000+ "bxdwj"),
            name : "test",
            email : `testt${parseInt(Math.random()*30000)}bah@gmail.com`,
            password : 'test123'
        }
        admin = await registerAdmin(postDataAdmin);
        admin = (await loginAdmin(postDataAdmin)).data.message;
        var postData = {
            name : "companuy" + parseInt(Math.random()*10000),
            description : "sresy4",
            metadataJSON : JSON.stringify({}),
            admin_id : admin.id,
            marketType : 0
        }
        app = (await registerApp(postData)).data.message;

        // Add currency
        const eco_data = (await getEcosystemData()).data.message;
        const eco_currencies = eco_data.currencies;
        const currency = eco_currencies.find( c => new String(c.ticker).toLowerCase() == 'eth')

        const postData2 = {
            app : app.id,
            passphrase : 'test278dbgwiu2179',
            currency_id : currency._id
        };
        let currencyT = await addCurrencyWalletToApp({...postData2, admin: admin.id}, admin.bearerToken , {id : admin.id});
        var postDataUser = {
            username : "sdfg" + parseInt(Math.random()*10000),
            name : "test",
            email : `testt${parseInt(Math.random()*10000)}@gmail.com`,
            password : 'test123',
            address : '90x',
            app : app.id
        }
        user = await registerUser(postDataUser);
        user = (await loginUser(postDataUser)).data.message;
        GlobalESportSingleton.setAdmin(admin);
        GlobalESportSingleton.setUser(user);
        GlobalESportSingleton.setApp(app);


        admin  = GlobalESportSingleton.getAdmin();
        user   = GlobalESportSingleton.getUser();
        app    = GlobalESportSingleton.getApp();

        socket = require('socket.io-client')(`${SOCKET_HOST}`);
        socket.on('connect', () => {
            socket.emit('authenticate', { token: user.bearerToken })
            .on('authenticated', () => {
                console.log("connected");
            })
            .on('unauthorized', (msg) => {
                console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
                throw new Error(msg.data.type);
            });
        });
    });


    it('should create bet', mochaAsync(async () => {
        await delay(10000);
        let res = null;
        await (() => {
            return new Promise((resolve)=>{
                socket.on("createBetReturn", (msg)=>{
                    res = msg;
                    resolve(res);
                });

                socket.emit("createBet",
                    {
                        app: app.id,
                        resultSpace: [
                            {
                                matchId: "5f1006c9a10c4000216e8fb7",
                                marketType:"winnerTwoWay",
                                betType: 0,
                                statistic: 0.5
                            }
                        ],
                        user:user.id,
                        betAmount:0.02,
                        currency:"5e108498049eba079930ae1c",
                        bid:1
                    }
                );
            });
        })();
        expect(res).to.not.equal(null);
        expect(res.bid).to.equal(1);
        socket.close();
    }));
})
