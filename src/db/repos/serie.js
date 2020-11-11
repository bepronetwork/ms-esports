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

    async findAllWithSerieEnded() {
        try {
            return new Promise((resolve, reject) => {
                SerieRepository.prototype.schema.model.find({ end_at: { $gte: new Date(new Date().getTime()-(1000*60*60*24*10)), $lte: new Date(new Date().getTime()+1000*60*60*24*1000) } })
                .lean()
                .exec((err, user) => {
                    if (err) { reject(err) }
                    SerieRepository.prototype.schema.model.find({end_at: null})
                    .lean()
                    .exec((err2, user2) => {
                        if (err2) { reject(err2) }
                        resolve([...JSON.parse(JSON.stringify(user)), ...JSON.parse(JSON.stringify(user2))]);
                    });
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