import {
    getVideogames, registerAdmin, loginAdmin, getVideogamesLayout
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Videogame', async () => {
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
        user = {id: "5e5bfd189517230021a8c99a", bearerToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF1dGgvNWU1YmZkMTg5NTE3MjMwMDIxYThjOTlhIiwidGltZSI6MTU5NjA2MzMyODY2NSwiaWF0IjoxNTkzNDcxMzI4fQ.bjiczYiMZK4DW51Uvo3BIsjKLGvLwXv9BHqNzvt73mx5c_mIAmhVxzZCeWtG157i8fJGYIy9YkVuub7TrwiZXA"},
        app = {id: "5e48d6a928c1af0021c366d6"}
    });

    it('should get All Videogames', mochaAsync(async () => {
        var res = await getVideogames({
            admin : admin.id
        }, admin.bearerToken , {id : admin.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get All Videogames Layout', mochaAsync(async () => {
        var res = await getVideogamesLayout({
            user : user.id,
            app : app.id,
        }, user.bearerToken , {id : user.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
