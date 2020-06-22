import { VideogameSchema } from '../schemas';

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

class VideogameRepository {

    constructor() {
    }
    /**
     * @function setVideogameModel
     * @param Videogame Model
     * @return {Schema} VideogameModel
     */

    setModel = (Videogame) => {
        return VideogameSchema.prototype.schema.model(Videogame)
    }

    async findAllVideogame(_id) {
        try {
            return new Promise((resolve, reject) => {
                VideogameSchema.prototype.schema.model.find()
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

    async findVideogameById(_id) {
        try {
            return new Promise((resolve, reject) => {
                VideogameSchema.prototype.schema.model.findById(_id)
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

VideogameSchema.prototype.schema = new VideogameSchema();


export default VideogameRepository;