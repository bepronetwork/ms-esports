import { BookedMatchLogic } from '../logic';
import ModelComponent from './modelComponent';
import { BookedMatchRepository } from '../db/repos';

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
            return await this.process('GetMatchesLayout');
        } catch (err) {
            throw err;
        }
    }

    async getSeriesMatchesLayout() {
        try {
            return await this.process('GetSeriesMatchesLayout');
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
            return await this.process('GetBookedMatches');
        } catch (err) {
            throw err;
        }
    }

    async getBookedSeriesMatches() {
        try {
            return await this.process('GetBookedSeriesMatches');
        } catch (err) {
            throw err;
        }
    }
}



export default BookedMatch;
