import {
    getMatchLayout
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Booked Matches', async () => {
    var user, app

    before( async () =>  {
        user = {id: "5e5bfd189517230021a8c99a", bearerToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF1dGgvNWU1YmZkMTg5NTE3MjMwMDIxYThjOTlhIiwidGltZSI6MTU5NjA2MzMyODY2NSwiaWF0IjoxNTkzNDcxMzI4fQ.bjiczYiMZK4DW51Uvo3BIsjKLGvLwXv9BHqNzvt73mx5c_mIAmhVxzZCeWtG157i8fJGYIy9YkVuub7TrwiZXA"},
        app = {id: "5e48d6a928c1af0021c366d6"}
    });

    it('should get All Matches Layout', mochaAsync(async () => {
        var res = await getMatchLayout({
            user : user.id,
            app : app.id,
        }, user.bearerToken , {id : user.id});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
