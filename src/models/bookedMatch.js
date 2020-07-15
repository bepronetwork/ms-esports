import { BookedMatchLogic } from '../logic';
import ModelComponent from './modelComponent';
import { BookedMatchRepository } from '../db/repos';
import { MapperMatchesAllSingleton } from "../controllers/Mapper";

class BookedMatch extends ModelComponent {

    constructor(params) {

        let db = new BookedMatchRepository();

        super(
            {
                name: 'BookedMatch',
                logic: new BookedMatchLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: []
            }
        );
    }
    async register() {
        try {
            return await this.process('Register');
        } catch (err) {
            throw err;
        }
    }

    async remove() {
        try {
            return await this.process('Remove');
        } catch (err) {
            throw err;
        }
    }
    async getMatchesLayout() {
        try {
            let res = await this.process('GetMatchesLayout');
            return MapperMatchesAllSingleton.output('MatchesAll', res);
        } catch (err) {
            throw err;
        }
    }

    async getSeriesMatchesLayout() {
        try {
            let res = await this.process('GetSeriesMatchesLayout');
            return MapperMatchesAllSingleton.output('MatchesAll', res);
        } catch (err) {
            throw err;
        }
    }

    async getSpecificMatchLayout() {
        try {
            return await this.process('GetSpecificMatchLayout');
        } catch (err) {
            throw err;
        }
    }

    async getTeamLayout() {
        try {
            return await this.process('GetTeamLayout');
        } catch (err) {
            throw err;
        }
    }

    async getPlayerLayout() {
        try {
            return await this.process('GetPlayerLayout');
        } catch (err) {
            throw err;
        }
    }

    async getBookedMatches() {
        try {
            let res = await this.process('GetBookedMatches');
            return MapperMatchesAllSingleton.output('MatchesAll', res);
        } catch (err) {
            throw err;
        }
    }

    async getBookedSeriesMatches() {
        try {
            let res = await this.process('GetBookedSeriesMatches');
            return MapperMatchesAllSingleton.output('MatchesAll', res);
        } catch (err) {
            throw err;
        }
    }
}



export default BookedMatch;
