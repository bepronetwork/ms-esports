import { BookedMatchSchema } from '../schemas';
import MongoComponent from './MongoComponent';
import { populate_match } from './populates';

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

class BookedMatchRepository extends MongoComponent {

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

    async findBookedMatchByExternalId(external_id) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find(external_id)
                    .lean()
                    .exec((err, user) => {
                        if (err) { reject(err) }
                        resolve(user);
                    });
            });
        } catch (err) {
            throw (err)
        }
    }

    async findMatchAll({ offset, size }) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find()
                    .populate(populate_match)
                    .skip(offset == undefined ? 0 : offset)
                    .limit((size > 10 || !size || size <= 0) ? 10 : size)
                    .lean()
                    .exec((err, user) => {
                        if (err) { reject(err) }
                        resolve(user);
                    });
            });
        } catch (err) {
            throw (err)
        }
    }

    async findMatchBySerieId({external_serie, offset, size}) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find({external_serie: {$in: external_serie}})
                    .populate(populate_match)
                    .skip(offset == undefined ? 0 : offset)
                    .limit((size > 10 || !size || size <= 0) ? 10 : size)
                    .lean()
                    .exec((err, user) => {
                        if (err) { reject(err) }
                        resolve(user);
                    });
            });
        } catch (err) {
            throw (err)
        }
    }
}

BookedMatchRepository.prototype.schema = new BookedMatchSchema();


export default BookedMatchRepository;