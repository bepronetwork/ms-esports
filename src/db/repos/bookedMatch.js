import { BookedMatchSchema } from '../schemas';
import MongoComponent from './MongoComponent';
import { populate_match } from './populates';
import pipeline_matches_by_series from './pipelines/matches_series';
import pipeline_matches_all from './pipelines/matches_all';

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

    findByApp(app) {
        return new Promise((resolve, reject)=>{
            BookedMatchRepository.prototype.schema.model.find({app})
            .exec((err, item) => {
                if(err) reject(err);
                resolve(item);
            });
        });
    }
    findAll() {
        return new Promise((resolve, reject)=>{
            BookedMatchRepository.prototype.schema.model.find()
            .exec((err, item) => {
                if(err) reject(err);
                resolve(item);
            });
        });
    }
    findByExternalMatchId(external_match) {
        return new Promise((resolve, reject)=>{
            BookedMatchRepository.prototype.schema.model.findOne({external_match})
            .exec((err, item) => {
                if(err) reject(err);
                resolve(item);
            });
        });
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

    async findMatchAll({ offset, size, app = {}}) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find({
                    ...app
                })
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

    async findMatchAllByDate({ offset, size, begin_at, end_at, app = {} }) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find({
                    game_date: { 
                        $gte: begin_at == undefined ? new Date() : begin_at, 
                        $lte: end_at == undefined ? new Date(new Date().setDate(new Date().getDate()+100)) : end_at
                    }, 
                    ...app
                })
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

    async findMatchBySerieId({external_serie, offset, size, app = {}}) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find({
                    external_serie: {$in: external_serie},
                    ...app
                })
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

    async findMatchBySerieIdByDate({external_serie, offset, size, app = {}, begin_at, end_at}) {
        try {
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model.find({
                    external_serie: {$in: external_serie},
                    ...app,
                    game_date: { 
                        $gte: begin_at == undefined ? new Date() : begin_at, 
                        $lte: end_at == undefined ? new Date(new Date().setDate(new Date().getDate()+100)) : end_at
                    }
                })
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

    async findMatchBySerieIdPipeline({external_serie, offset, size, app = {}, begin_at, end_at, status, sort=1}) {
        try {
            switch (begin_at) {
                case "all":
                    begin_at = new Date(new Date().setDate(new Date().getDate() - 20000));
                    end_at = new Date(new Date().setDate(new Date().getDate() + 100));
                    break;
                case undefined:
                    begin_at = (new Date()).toISOString().split("T")[0];
                    break;
            }
            switch (end_at) {
                case undefined:
                    end_at = (new Date(new Date().setDate(new Date().getDate() + 100))).toISOString().split("T")[0];
                    break;
                case end_at:
                    end_at = (new Date(new Date().setDate(new Date(end_at).getDate() + 2))).toISOString().split("T")[0];
                    break;
            }
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model
                .aggregate(pipeline_matches_by_series({external_serie, offset, size, app, begin_at, end_at, status, sort}))
                .exec((err, data) => {
                    if (err) { reject(err) }
                    resolve(data);
                });
            });
        } catch (err) {
            throw (err)
        }
    }

    async findMatchAllPipeline({offset, size, app = {}, begin_at, end_at, status, sort=1}) {
        try {
            switch (begin_at) {
                case "all":
                    begin_at = new Date(new Date().setDate(new Date().getDate() - 20000));
                    end_at = new Date(new Date().setDate(new Date().getDate() + 100));
                    break;
                case undefined:
                    begin_at = (new Date()).toISOString().split("T")[0];
                    break;
            }
            switch (end_at) {
                case undefined:
                    end_at = (new Date(new Date().setDate(new Date().getDate() + 100))).toISOString().split("T")[0];
                    break;
                case end_at:
                    end_at = (new Date(new Date().setDate(new Date(end_at).getDate() + 2))).toISOString().split("T")[0];
                    break;
            }
            return new Promise((resolve, reject) => {
                BookedMatchRepository.prototype.schema.model
                .aggregate(pipeline_matches_all({offset, size, app, begin_at, end_at, status, sort}))
                .exec((err, data) => {
                    if (err) { reject(err) }
                    resolve(data);
                });
            });
        } catch (err) {
            throw (err)
        }
    }
}

BookedMatchRepository.prototype.schema = new BookedMatchSchema();


export default BookedMatchRepository;