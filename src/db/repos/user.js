import MongoComponent from './MongoComponent';
import { UserSchema } from '../schemas/user';
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


class UsersRepository extends MongoComponent{

    constructor(){
        super(UserSchema)
    }
    /**
     * @function setUserModel
     * @param User Model
     * @return {Schema} UserModel
     */

    setModel = (user) => {
        return UsersRepository.prototype.schema.model(user)
    }

    async findUserById(_id){
        try {
            return new Promise((resolve, reject) => {
                UsersRepository.prototype.schema.model.findById(_id)
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

    async findUserByIdAndApp({_id, app}){
        try {
            return new Promise((resolve, reject) => {
                UsersRepository.prototype.schema.model.findOne({
                    _id,
                    app
                })
                .populate(["wallet"])
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

UsersRepository.prototype.schema = new UserSchema();

export default UsersRepository;