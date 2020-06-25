import {
    getSpecificMatch,
    getSeriesMatches,
    registerAdmin,
    loginAdmin
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Match', async () => {
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

    it('should get Matches by Series Ids', mochaAsync(async () => {
        var res = await getSeriesMatches({
            "serie_id":[2658, 2755],
            admin : admin.id
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Matches by Id', mochaAsync(async () => {
        var res = await getSpecificMatch({
            "match_id": 564849,
            admin : admin.id
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
