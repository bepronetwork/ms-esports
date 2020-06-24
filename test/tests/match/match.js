import {
    getSpecificMatch,
    getSeriesMatches
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Match', async () => {

    it('should get Matches by Series Ids', mochaAsync(async () => {
        var res = await getSeriesMatches({"serie_id":[2658, 2755]});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));

    it('should get Matches by Id', mochaAsync(async () => {
        var res = await getSpecificMatch({"match_id": 564849});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
