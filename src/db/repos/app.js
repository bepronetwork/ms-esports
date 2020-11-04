import MongoComponent from './MongoComponent';
import { AppSchema } from '../schemas';
import { populate_wallet } from './populates';

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


class AppRepository extends MongoComponent{

    constructor(){
        super(AppSchema)
    }
    /**
     * @function setAppModel
     * @param App Model
     * @return {Schema} AppModel
     */

    setModel = (App) => {
        return AppRepository.prototype.schema.model(App)
    }

    async findAppById(_id){
        try {
            return new Promise((resolve, reject) => {
                AppRepository.prototype.schema.model.findById(_id)
                    .populate(populate_wallet)
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

    async findAppByIdNotPopulated(_id){
        try {
            return new Promise((resolve, reject) => {
                AppRepository.prototype.schema.model.findById(_id)
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

AppRepository.prototype.schema = new AppSchema();

export default AppRepository;