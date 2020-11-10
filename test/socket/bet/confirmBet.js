const controller = require('../../../src/api/controllers/bet');

import {GlobalESportSingleton} from "../../GlobalESport";
import {
    registerAdmin,
    loginAdmin,
    registerApp,
    registerUser,
    loginUser,
    getEcosystemData,
    addCurrencyWalletToApp,
    setBookedMatchEsport,
    getMatchAllEsport,
    getSpecificMatchLayoutEsport,
    getMatchLayoutEsport,
    getAppAuth,
    authAdmin
} from '../../methods';
import chai from 'chai';
import { mochaAsync } from '../../utils';
import { SOCKET_HOST, PORT } from "../../../src/config";
import delay from 'delay';
import WalletsRepository from "../../../src/db/repos/wallet";
import { BetEsportsRepository, BetResultSpacesRepository } from "../../../src/db/repos";
const io = require('socket.io-client');

const expect = chai.expect;

context('Confirm Bet', async () => {
    var admin, user, app, dataBet, appWallet, userWallet;
    before( async () =>  {
        app = {id:"5f5295d31534320027631bb4"}
        admin = (await authAdmin({admin:"5f5295cc1534320027631b94", app:app.id},"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF1dGgvNWY1Mjk1Y2MxNTM0MzIwMDI3NjMxYjk0IiwidGltZSI6MTYwNDY4MzYwODUyMCwiaWF0IjoxNjAyMDkxNjA4fQ.DHHEWv4bvlWiA8sQpQKLuL-nqMK_de-Qn7oYe2SQGq-iZhaR4d69z84SAOj9MhK5zjaBiH6NxD7TQsHQA_ObGA",{id:"5f5295cc1534320027631b94"})).data.message;

        var postDataUser = {
            username : "sivapof211@x1post.com",
            password : 'sivapof211@x1post.com',
            app : app.id
        }
        app = (await getAppAuth({app : app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id})).data.message;
        user = (await loginUser(postDataUser)).data.message;
        GlobalESportSingleton.setAdmin(admin);
        GlobalESportSingleton.setUser(user);
        GlobalESportSingleton.setApp(app);


        admin  = GlobalESportSingleton.getAdmin();
        user   = GlobalESportSingleton.getUser();
        app    = GlobalESportSingleton.getApp();

        appWallet  = app.wallet.find((w)=>w.currency.ticker.toLowerCase()=="eth");
        userWallet = user.wallet.find((w)=>w.currency.ticker.toLowerCase()=="eth");

        dataBet = {
            "gain":{
                betEsport   : "5fa9444c443501002a46ab3b",
                betResultId : "5fa9444c443501002a46ab3a",
                matchId     : "5fa8c5bbc74b6000232a8209",
                winner      : 3230,
                odds        : 2.35,
                winAmount   : 0.0144,
                betAmount   : 0.01
            },
            "loss":{
                betEsport   : "5fa94444443501002a46ab37",
                betResultId : "5fa94444443501002a46ab36",
                matchId     : "5fa8c5bbc74b6000232a8209",
                winner      : 3230,
                odds        : 2.35,
                winAmount   : 0,
                betAmount   : 0.01
            }
        }

    });

    it('Should confirm bet gain', mochaAsync(async () => {
        await WalletsRepository.prototype.updatePlayBalanceNotInc( userWallet._id, {newBalance:1});
        await WalletsRepository.prototype.updatePlayBalanceNotInc( appWallet._id, {newBalance:1});
        await BetEsportsRepository.prototype.updateResolve(dataBet.gain.betEsport, {resolved:false});
        await BetResultSpacesRepository.prototype.updateFinish(dataBet.gain.betResultId, {finished:false});

        await controller.confirmBets({ betResultId: dataBet.gain.betResultId, matchId: dataBet.gain.matchId, winner: dataBet.gain.winner})

        var postDataUser = {
            username : "sivapof211@x1post.com",
            password : 'sivapof211@x1post.com',
            app : app.id
        }

        app         = (await getAppAuth({app : app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id})).data.message;
        user        = (await loginUser(postDataUser)).data.message;
        appWallet   = app.wallet.find((w)=>w.currency.ticker.toLowerCase()=="eth");
        userWallet  = user.wallet.find((w)=>w.currency.ticker.toLowerCase()=="eth");

        expect(appWallet.playBalance).to.equal(1-(dataBet.gain.winAmount-dataBet.gain.betAmount));
        expect(userWallet.playBalance).to.equal(1+dataBet.gain.winAmount);
    }));

    it('Should confirm bet loss', mochaAsync(async () => {
        await WalletsRepository.prototype.updatePlayBalanceNotInc( userWallet._id, {newBalance:1});
        await WalletsRepository.prototype.updatePlayBalanceNotInc( appWallet._id, {newBalance:1});
        await BetEsportsRepository.prototype.updateResolve(dataBet.loss.betEsport, {resolved:false});
        await BetResultSpacesRepository.prototype.updateFinish(dataBet.loss.betResultId, {finished:false});

        await controller.confirmBets({ betResultId: dataBet.loss.betResultId, matchId: dataBet.loss.matchId, winner: dataBet.loss.winner})

        var postDataUser = {
            username : "sivapof211@x1post.com",
            password : 'sivapof211@x1post.com',
            app : app.id
        }

        app         = (await getAppAuth({app : app.id, admin: admin.id}, admin.security.bearerToken, {id : admin.id})).data.message;
        user        = (await loginUser(postDataUser)).data.message;
        appWallet   = app.wallet.find((w)=>w.currency.ticker.toLowerCase()=="eth");
        userWallet  = user.wallet.find((w)=>w.currency.ticker.toLowerCase()=="eth");

        expect(appWallet.playBalance).to.equal(1+dataBet.loss.betAmount);
        expect(userWallet.playBalance).to.equal(1);
    }));
})
