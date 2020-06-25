import {
    getVideogames
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Videogame', async () => {

    it('should get All Videogames', mochaAsync(async () => {
        var res = await getVideogames({});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
