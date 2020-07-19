import { BetEsportsSchema } from '../schemas';
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

class BetEsportsRepository extends MongoComponent{

    constructor() {
        super(BetEsportsSchema)
    }
    /**
     * @function setBetEsportsModel
     * @param BetEsports Model
     * @return {Schema} BetEsportsModel
     */

    setModel = (BetEsports) => {
        return BetEsportsRepository.prototype.schema.model(BetEsports)
    }

    async updateResultEnd(_id, {winAmount, isWon}) {
        try {
            return new Promise((resolve, reject) => {
                BetEsportsRepository.prototype.schema.model.findByIdAndUpdate(_id, {winAmount, isWon})
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
            });
        } catch (err) {
            throw (err)
        }
    }

    async findByBetResultId(result) {
        try {
            return new Promise((resolve, reject) => {
                BetEsportsRepository.prototype.schema.model.find({ result : { $in: [result] } })
                .populate(["BetResult"])
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item[0] == null ? [] : item[0]);
                });
            });
        } catch (err) {
            throw (err)
        }
    }

    

    async findById(_id) {
        try {
            return new Promise((resolve, reject) => {
                BetEsportsRepository.prototype.schema.model.findById(_id)
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

    async findAll() {
        try {
            return new Promise((resolve, reject) => {
                BetEsportsRepository.prototype.schema.model.find()
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

BetEsportsRepository.prototype.schema = new BetEsportsSchema();


export default BetEsportsRepository;