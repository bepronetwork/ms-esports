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
                MatchRepository.prototype.schema.model.findOne({external_id})
                    .lean()
                    .exec((err, item) => {
                        if (err) { reject(err) }
                        resolve(item);
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

    async findMatchBySerieId({serie_id, offset, size, status = {}}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find({
                    serie_id: {$in: serie_id},
                    ...status
                })
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

    async findMatchBySerieIdAndDate({serie_id, offset, size, begin_at, end_at, status = {}}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find({
                    serie_id: {$in: serie_id},
                    game_date: { 
                        $gte: begin_at == undefined ? new Date() : begin_at, 
                        $lte: end_at == undefined ? new Date(new Date().setDate(new Date().getDate()+100)) : end_at
                    },
                    ...status
                })
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

    async findMatchAllByDate({offset, size, begin_at, end_at, status = {}}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find({ 
                    game_date: { 
                        $gte: begin_at == undefined ? new Date() : begin_at, 
                        $lte: end_at == undefined ? new Date(new Date().setDate(new Date().getDate()+100)) : end_at
                    },
                    ...status
                })
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

    async findMatchAll({offset, size, status = {}}) {
        try {
            return new Promise((resolve, reject) => {
                MatchRepository.prototype.schema.model.find({
                    ...status
                })
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

MatchRepository.prototype.schema = new MatchSchema();


export default MatchRepository;