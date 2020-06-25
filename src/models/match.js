import { MatchLogic } from '../logic';
import ModelComponent from './modelComponent';
import { MatchRepository } from '../db/repos';
import {
    MapperMatchSingleton,
} from "../controllers/Mapper";

class Match extends ModelComponent {

    constructor(params) {

        let db = new MatchRepository();

        super(
            {
                name: 'Match',
                logic: new MatchLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: []
            }
        );
    }

    async getSeriesMatches() {
        try {
            let res = await this.process('GetSeriesMatches');
            return res;
            // return MapperMatchSingleton.output('Match', res._doc);
        } catch (err) {
            throw err;
        }
    }

    async getSpecificMatch() {
        try {
            let res = await this.process('GetSpecificMatch');
            return res;
            // return MapperMatchSingleton.output('Match', res._doc);
        } catch (err) {
            throw err;
        }
    }

    async getMatchesAll() {
        try {
            let res = await this.process('GetMatchesAll');
            return res;
            // return MapperMatchSingleton.output('Match', res._doc);
        } catch (err) {
            throw err;
        }
    }
}

export default Match;
