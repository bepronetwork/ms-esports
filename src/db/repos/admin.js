import { AdminSchema } from '../schemas';
import { populate_admin } from './populates';
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

class AdminsRepository extends MongoComponent{

    constructor(){
        super(AdminSchema)
    }
    /**
     * @function setAdminModel
     * @param Admin Model
     * @return {Schema} AdminModel
     */

    setModel = (user) => {
        return AdminsRepository.prototype.schema.model(user)
    }

    async findAdminById(_id){
        try{
            return new Promise( (resolve, reject) => {
                AdminsRepository.prototype.schema.model.findById(_id)
                .populate(populate_admin)
                .lean()
                .exec( (err, user) => {
                    if(err) { reject(err)}
                    resolve(user);
                });
            });
        }catch(err){
            throw (err)
        }
    }

    findAdmin(username){
        return new Promise( (resolve, reject) => {
            AdminsRepository.prototype.schema.model.findOne({$or: [
                {"username": username},
                {"email": username}
            ]})
            .populate(populate_admin)
            .lean()
            .exec( (err, user) => {
                if(err) {reject(err)}
                resolve(user);
            });
        });
    }

    findAdminEmail(email) {
        return new Promise( (resolve, reject) => {
            AdminsRepository.prototype.schema.model.findOne({'email' : email})
            .populate(populate_admin)
            .lean()
            .exec( (err, user) => {
                if(err) {reject(err)}
                resolve(user);
            });
        });
    }

    findAdminUsername(username) {
        return new Promise( (resolve, reject) => {
            AdminsRepository.prototype.schema.model.findOne({'username' : username})
            .populate(populate_admin)
            .lean()
            .exec( (err, user) => {
                if(err) {reject(err)}
                resolve(user);
            });
        });
    }

    updateAdmin(param) {
        return new Promise( async (resolve,reject) => {
            let admin = await this.findAdminEmail(param.email);
            AdminsRepository.prototype.schema.model.findByIdAndUpdate(
                admin._id,
                { $set : param },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    updatePasswordAdmin({id, param}) {
        return new Promise( async (resolve,reject) => {
            AdminsRepository.prototype.model.findByIdAndUpdate(
                id,
                { $set : param },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    findAdminByApp(app) {
        return new Promise((resolve)=>{
            AdminsRepository.prototype.schema.model.find({app})
                .populate(populate_admin)
                .lean()
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }

    addApp(admin_id, app){
        return new Promise( (resolve,reject) => {
            AdminsRepository.prototype.schema.model.findByIdAndUpdate(
                admin_id,
                { $set : { "app" : app } },
                { 'new': true })
                .exec( (err, item) => {
                    if(err){reject(err)}
                    resolve(item);
                }
            )
        });
    }
}

AdminsRepository.prototype.schema = new AdminSchema();


export default AdminsRepository;