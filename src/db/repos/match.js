import { MatchSchema } from '../schemas';

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

class MatchRepository {

    constructor() {
    }
    /**
     * @function setMatchModel
     * @param Match Model
     * @return {Schema} MatchModel
     */

    setModel = (Match) => {
        return MatchSchema.prototype.schema.model(Match)
    }

    async findMatchById(_id) {
        try {
            return new Promise((resolve, reject) => {
                MatchSchema.prototype.schema.model.findById(_id)
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

    async findMatchByGameId(_id) {
        try {
            return new Promise((resolve, reject) => {
                SerieSchema.prototype.schema.model.findById({videogame_id: _id})
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

MatchSchema.prototype.schema = new MatchSchema();


export default MatchRepository;