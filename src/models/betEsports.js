import { BetEsportsLogic } from '../logic';
import ModelComponent from './modelComponent';
import { BetEsportsRepository } from '../db/repos';

class BetEsports extends ModelComponent {

    constructor(params) {

        let db = new BetEsportsRepository();

        super(
            {
                name: 'BetEsports',
                logic: new BetEsportsLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: []
            }
        );
    }

    async createBet() {
        try {
            return await this.process('CreateBet');
        } catch (err) {
            throw err;
        }
    }
}



export default BetEsports;
