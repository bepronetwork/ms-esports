import { SerieSchema } from '../schemas';

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

class SerieRepository {

    constructor() {
    }
    /**
     * @function setSerieModel
     * @param Serie Model
     * @return {Schema} SerieModel
     */

    setModel = (Serie) => {
        return SerieSchema.prototype.schema.model(Serie)
    }

    async findSerieById(_id) {
        try {
            return new Promise((resolve, reject) => {
                SerieSchema.prototype.schema.model.findById(_id)
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

    async findSerieByGameId(_id) {
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

SerieSchema.prototype.schema = new SerieSchema();


export default SerieRepository;