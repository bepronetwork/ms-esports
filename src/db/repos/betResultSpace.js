import MongoComponent from './MongoComponent';
import { BetResultSchema } from '../schemas';
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


const foreignKeys = [];

class BetResultSpacesRepository extends MongoComponent{

    constructor(){
        super(BetResultSchema)
    }
    /**
     * @function setBetResultSpaceModel
     * @param BetResultSpace Model
     * @return {Schema} BetResultSpaceModel
     */

    setModel = (bet) => {
        return BetResultSpacesRepository.prototype.schema.model(bet)
    }

    updateStatus(_id, {status, finished}){ 
        return new Promise( (resolve, reject) => {
            BetResultSpacesRepository.prototype.schema.model.findOneAndUpdate({_id}, {status, finished})
            .exec( (err, BetResultSpace) => {
                console.log(BetResultSpace)
                if(err) { reject(err)}
                resolve(BetResultSpace);
            });
        });
    }

    updateFinish(_id, {finished}){
        return new Promise( (resolve, reject) => {
            BetResultSpacesRepository.prototype.schema.model.findOneAndUpdate({_id}, {finished})
            .exec( (err, BetResultSpace) => {
                console.log(BetResultSpace)
                if(err) { reject(err)}
                resolve(BetResultSpace);
            });
        });
    }

    findById(_id){ 
        return new Promise( (resolve, reject) => {
            BetResultSpacesRepository.prototype.schema.model.findById(_id)
            .exec( (err, BetResultSpace) => {
                if(err) { reject(err)}
                resolve(BetResultSpace);
            });
        });
    }

}

BetResultSpacesRepository.prototype.schema = new BetResultSchema();

export default BetResultSpacesRepository;