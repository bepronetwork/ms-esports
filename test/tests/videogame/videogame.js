import {
    getVideogames, registerAdmin, loginAdmin, getTeam, getPlayer
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Videogame', async () => {
    var admin

    before( async () =>  {
        var postDataAdmin = {
            username : "admin1" + parseInt(Math.random()*30000+ "bxdwj"),
            name : "test",
            email : `testt${parseInt(Math.random()*30000)}bah@gmail.com`,
            password : 'test123'
        }
        admin = await registerAdmin(postDataAdmin);
        admin = (await loginAdmin(postDataAdmin)).data.message;
    });

    it('should get All Videogames', mochaAsync(async () => {
        var res = await getVideogames({
            admin : admin.id
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Team', mochaAsync(async () => {
        var res = await getTeam({
            team_id: 318,
            slug: "league-of-legends",
            admin : admin.id
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Player', mochaAsync(async () => {
        var res = await getPlayer({
            player_id: 1027,
            slug: "league-of-legends",
            admin : admin.id
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
