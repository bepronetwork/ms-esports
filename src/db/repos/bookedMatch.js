import { BookedMatchSchema } from '../schemas';
import MongoComponent from './MongoComponent';

/**
 * Accounts database interaction class.
 *
 * @class
 * @memberof db.repos.accounts
 * @requires bluebird
 * @requires lodash
 * @requires db/sql.accounts
 * @see Parent: {@link db.repos.accounts}
 */

class BookedMatchRepository extends MongoComponent{

    constructor() {
        super(BookedMatchSchema);
    }
    /**
     * @function setBookedMatchModel
     * @param BookedMatch Model
     * @return {Schema} BookedMatchModel
     */

    setModel = (BookedMatch) => {
        return BookedMatchRepository.prototype.schema.model(BookedMatch)
    }
    findByMatchId(match) {
        return new Promise((resolve, reject)=>{
            BookedMatchRepository.prototype.schema.model.findOne({match})
            .exec((err, item) => {
                if(err) reject(err);
                resolve(item);
            });
        });
    }
    removeByMatchId({_id, app}) {
        return new Promise((resolve, reject)=>{
            BookedMatchRepository.prototype.schema.model.deleteOne({_id, app})
            .exec((err, item) => {
                if(err) reject(err);
                resolve(item);
            });
        });
    }
}

BookedMatchRepository.prototype.schema = new BookedMatchSchema();


export default BookedMatchRepository;