import { MatchSchema } from '../schemas';
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

class MatchRepository extends MongoComponent{

    constructor() {
        super(MatchSchema);
    }
    /**
     * @function setMatchModel
     * @param Match Model
     * @return {Schema} MatchModel
     */

    setModel = (Match) => {
        return MatchRepository.prototype.schema.model(Match)
    }

    async findMatchById(_id) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.findById(_id)
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

    async findMatchByGameId(videogame_id) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find(videogame_id)
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

    async findMatchBySerieId(serie_id) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find(serie_id)
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

MatchRepository.prototype.schema = new MatchSchema();


export default MatchRepository;