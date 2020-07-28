import {GlobalESportSingleton} from "../../GlobalESport";
import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';
import { SOCKET_HOST, PORT } from "../../../src/config";
import io from 'socket.io-client';
const expect = chai.expect;

context('Bet', async () => {
    var admin, user, app, socket;

    before( async () =>  {
        admin  = GlobalESportSingleton.getAdmin();
        user   = GlobalESportSingleton.getUser();
        app    = GlobalESportSingleton.getApp();

        socket = io.connect(`${SOCKET_HOST}:${PORT}`, {
            extraHeaders: { Authorization: `Bearer ${user.bearerToken}` }
        });
    });

    it('should create bet', mochaAsync(async () => {
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
        let res = null;
        await (() => {
            return new Promise((resolve)=>{
                socket.on("createBetReturn", (msg)=>{
                    console.log(msg);
                    res = msg;
                    resolve(res);
                });
            });
        })();
        expect(res).to.not.equal(null);
        expect(res.bid).to.equal(1);
        await (() => {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(true);
                }, 10000);
            });
        })();
        socket.close();
    }));
})
