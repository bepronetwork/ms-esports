import {GlobalESportSingleton} from "../../GlobalESport";
import {
    getMatchLayout,
    getSeriesMatchesLayout,
    getSpecificMatchLayout,
    getTeamLayout,
    getPlayerLayout,
    registerAdmin,
    loginAdmin,
    getBookedMatches,
    getBookedSeriesMatches,
    registerApp,
    registerUser,
    loginUser
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Booked Matches', async () => {
    var admin, user, app

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
    });

    it('should get All Booked Matches - BackOffice', mochaAsync(async () => {
        var res = await getBookedMatches({
            admin : admin.id,
            begin_at: "2020-06-20"
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Booked Matches By Serie - BackOffice', mochaAsync(async () => {
        var res = await getBookedSeriesMatches({
            serie_id:[2774],
            admin : admin.id,
            begin_at: "2020-06-20"
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get All Matches Layout', mochaAsync(async () => {
        var res = await getMatchLayout({
            app: app.id,
            begin_at: "2020-06-20"
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Matches By Serie Layout', mochaAsync(async () => {
        var res = await getSeriesMatchesLayout({
            serie_id:[2774],
            app: app.id,
            begin_at: "2020-06-20"
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Match By Id Layout', mochaAsync(async () => {
        var res = await getSpecificMatchLayout({
            match_id: 564165
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Team By Id Layout', mochaAsync(async () => {
        var res = await getTeamLayout({
            team_id: 318,
            slug: "league-of-legends"
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Player By Id Layout', mochaAsync(async () => {
        var res = await getPlayerLayout({
            player_id: 1027,
            slug: "league-of-legends"
        });
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
