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
}



export default BookedMatch;
