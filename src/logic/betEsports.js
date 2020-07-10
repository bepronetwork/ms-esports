import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
let error = new ErrorManager();


// Private fields
let self; // eslint-disable-line no-unused-vars
let library;
let modules;

let __private = {};


/**
 * BetEsports logic.
 *
 * @class
 * @memberof logic
 * @param {function} params - Function Params
 **/

const processActions = {
	__register : async (params) => {
		return params;
	}
}

/**
 * BetEsports logic.
 *
 * @class progressActions
 * @memberof logic
 * @param {function} params - Function Params
 **/

const progressActions = {
	__register : async (params) => {
		try{

			let BetEsports = await self.save(params);
			return {
				...BetEsports,
				type : 'betEsports'
			};
		}catch(err){
			throw err;
		}
	}
}

/**
 * Main BetEsports logic.
 *
 * @class
 * @memberof logic
 * @see Parent: {@link logic}
 * @requires lodash
 * @requires helpers/sort_by
 * @requires helpers/bignum
 * @requires logic/block_reward
 * @param {Database} db
 * @param {ZSchema} schema
 * @param {Object} logger
 * @param {function} cb - Callback function
 * @property {Log_model} model
 * @property {Log_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class BetEsportsLogic extends LogicComponent {
	constructor(scope) {
		super(scope);
		self = this;
		__private = {
			//ADD
			db : scope.db,
			__normalizedSelf : null
		};

		library = {
			process : processActions,
			progress : progressActions
		}
    }


    /**
	 * Validates BetEsports schema.
	 *
	 * @param {BetEsports} BetEsports
	 * @returns {BetEsports} BetEsports
	 * @throws {string} On schema.validate failure
	 */
	async objectNormalize(params, processAction) {
		try{
			switch(processAction) {
				case 'Register' : {
					return library.process.__register(params); break;
				};
			}
		}catch(err){
			throw err;
		}
	}

	 /**
	 * Tests BetEsports schema.
	 *
	 * @param {BetEsports} BetEsports
	 * @returns {BetEsports} BetEsports
	 * @throws {string} On schema.validate failure
	 */

	testParams(params, action){
		try{
			error.betEsports(params, action);
		}catch(err){
			throw err;
		}
	}



	async progress(params, progressAction){
		try{
			switch(progressAction) {
				case 'Register' : {
					return await library.progress.__register(params);
				}
			}
		}catch(err){
			throw err;
		}
	}
}

// Export Default Module
export default BetEsportsLogic;