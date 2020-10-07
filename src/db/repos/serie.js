import { SerieSchema } from '../schemas';
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

class SerieRepository extends MongoComponent{

    constructor() {
        super(SerieSchema)
    }
    /**
     * @function setSerieModel
     * @param Serie Model
     * @return {Schema} SerieModel
     */

    setModel = (Serie) => {
        return SerieRepository.prototype.schema.model(Serie)
    }

    async findAll() {
        try {
            return new Promise((resolve, reject) => {
                SerieRepository.prototype.schema.model.find()
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

    async findSerieByExternalId(external_id) {
        try {
            return new Promise((resolve, reject) => {
                SerieRepository.prototype.schema.model.findOne(external_id)
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

    async findSerieByGameExternalId(videogame_id) {
        try {
            return new Promise((resolve, reject) => {
                SerieRepository.prototype.schema.model.find(videogame_id)
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

SerieRepository.prototype.schema = new SerieSchema();


export default SerieRepository;