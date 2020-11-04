import {GlobalESportSingleton} from "../../GlobalESport";
import {
    registerAdmin,
    loginAdmin,
    registerApp,
    registerUser,
    loginUser,
    getEcosystemData,
    addCurrencyWalletToApp,
    setBookedMatch,
    getMatchAll,
    getSpecificMatch,
    getSpecificMatchLayout,
    getMatchLayout
} from '../../methods';
import chai from 'chai';
import { mochaAsync } from '../../utils';
import { SOCKET_HOST, PORT } from "../../../src/config";
import delay from 'delay';
const io = require('socket.io-client');

const expect = chai.expect;

context('Create Bet', async () => {
    var admin, user, app, socket;
    before( async () =>  {
        var postDataAdmin = {
            username : "admin1" + parseInt(Math.random()*30000+ "bxdlwj"),
            name : "test",
            email : `testt${parseInt(Math.random()*30000)}balh@gmail.com`,
            password : 'test12l3'
        }
        admin = await registerAdmin(postDataAdmin);
        admin = (await loginAdmin(postDataAdmin)).data.message;
        var postData = {
            name : "companuly" + parseInt(Math.random()*10000),
            description : "slresy4",
            metadataJSON : JSON.stringify({}),
            admin_id : admin.id,
            marketType : 0
        }
        app = (await registerApp(postData)).data.message;

        // Add currency
        const eco_data = (await getEcosystemData()).data.message;
        const eco_currencies = eco_data.currencies;
        const currency = eco_currencies.find( c => new String(c.ticker).toLowerCase() == 'eth');

        const postData2 = {
            app : app.id,
            passphrase : 'test278dbgwiu2179',
            currency_id : currency._id
        };
        let currencyT = await addCurrencyWalletToApp({...postData2, admin: admin.id}, admin.bearerToken , {id : admin.id});
        var postDataUser = {
            username : "sdfgu" + parseInt(Math.random()*10000),
            name : "testu",
            email : `testtu${parseInt(Math.random()*10000)}@gmail.com`,
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
    });

    it('Should create bet with match not booked!', mochaAsync(async () => {
        socket = io.connect(`${SOCKET_HOST}`, {
            'reconnection delay' : 0,
            'reopen delay' : 0,
            'force new connection' : true
        });
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
        await delay(5000);
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
        expect(res.code).to.equal(13);
    }));

    it('Should create bet with match not booked!', mochaAsync(async () => {
        socket = io.connect(`${SOCKET_HOST}`, {
            'reconnection delay' : 0,
            'reopen delay' : 0,
            'force new connection' : true
        });
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
        await delay(5000);
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
        expect(res.code).to.equal(13);
    }));


    // it('Should create bet with Success!', mochaAsync(async () => {
    //     socket.on('disconnect', () => {
    //         console.log("disconnect");
    //         socket.disconnect();
    //         socket.close();
    //     });
    //     socket.disconnect();
    //     socket = io.connect(`${SOCKET_HOST}`, {
    //         'reconnection delay' : 0,
    //         'reopen delay' : 0,
    //         'force new connection' : true
    //     });
    //     socket.on('connect', () => {
    //         socket.emit('authenticate', { token: user.bearerToken })
    //         .on('authenticated', () => {
    //             console.log("connected");
    //         })
    //         .on('unauthorized', (msg) => {
    //             console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    //             throw new Error(msg.data.type);
    //         });
    //     });
    //     await delay(5000);

    //     let getMatches = await getMatchAll({admin : admin.id, status: ["pre_match"]}, admin.bearerToken, {id : admin.id});

    //     let matchOne = getMatches.data.message[0];

    //     await setBookedMatch(
    //         {
    //             match_external_id : matchOne.id,
    //             app               : app.id,
    //             admin             : admin.id
    //         }, admin.bearerToken , {id : admin.id}
    //     );

    //     let getMatchesLayout = await getMatchLayout(
    //         {
    //             app    : app.id,
    //             size   : 10,
    //             status : ["pre_match"]
    //         }
    //     );

    //     let matchesLayoutOne = getMatchesLayout.data.message[0];
    //         matchesLayoutOne = await getSpecificMatchLayout({match_id: matchesLayoutOne.id});

    //     let odd = (matchesLayoutOne.data.message.odds.winnerTwoWay.length == 0) ? matchesLayoutOne.data.message.odds.winnerThreeWay : matchesLayoutOne.data.message.odds.winnerTwoWay;
    //     let marketName = (matchesLayoutOne.data.message.odds.winnerTwoWay.length == 0) ? "winnerThreeWay" : "winnerTwoWay";

    //     let res = null;
        
    //     await (() => {
    //         return new Promise((resolve)=>{
    //             socket.on("createBetReturn", (msg)=>{
    //                 res = msg;
    //                 resolve(res);
    //             });
    //             socket.emit("createBet",
    //                 {
    //                     app: app.id,
    //                     resultSpace: [
    //                         {
    //                             matchId: "5f1006c9a10c4000216e8fb7",
    //                             marketType:"winnerTwoWay",
    //                             betType: 0,
    //                             statistic: 0.5
    //                         }
    //                     ],
    //                     user:user.id,
    //                     betAmount:0.02,
    //                     currency:"5e108498049eba079930ae1c",
    //                     bid:1
    //                 }
    //             );
    //         });
    //     })();

    //     // await (() => {
    //     //     return new Promise((resolve)=>{
    //     //         socket.on("createBetReturn", (msg)=>{
    //     //             res = msg;
    //     //             resolve(res);
    //     //         });
    //     //         socket.emit("createBet",
    //     //             {
    //     //                 app: app.id,
    //     //                 resultSpace: [
    //     //                     {
    //     //                         matchId: matchesLayoutOne.data.message.match_id,
    //     //                         marketType: marketName,
    //     //                         betType: 0,
    //     //                         odds: (1/odd[0].probability)
    //     //                     }
    //     //                 ],
    //     //                 user:user.id,
    //     //                 betAmount:0.001,
    //     //                 currency:"5e108498049eba079930ae1c",
    //     //                 bid:2
    //     //             }
    //     //         );
    //     //     });
    //     // })();
    //     expect(res).to.not.equal(null);
    //     expect(res.bid).to.equal(2);
    //     expect(res.code).to.equal(200);
    // }));

})
