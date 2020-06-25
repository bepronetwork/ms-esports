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

    async findMatchByExternalId(external_id) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find(external_id)
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

    async findMatchByGameId({videogame_id, offset, size}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find(videogame_id)
                    .skip(offset == undefined ? 0 : offset)
                    .limit((size > 30 || !size || size <= 0) ? 30 : size)
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

    async findMatchBySerieId({serie_id, offset, size}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find({serie_id: {$in: serie_id}})
                    .skip(offset == undefined ? 0 : offset)
                    .limit((size > 30 || !size || size <= 0) ? 30 : size)
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

    async findMatchAll({offset, size}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find()
                    .skip(offset == undefined ? 0 : offset)
                    .limit((size > 30 || !size || size <= 0) ? 30 : size)
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