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
}



export default BookedMatch;
