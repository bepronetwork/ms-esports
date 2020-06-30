import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { BookedMatchRepository, MatchRepository } from '../db/repos';
import { PANDA_SCORE_TOKEN } from '../config';
import { throwError } from '../controllers/Errors/ErrorManager';
let error = new ErrorManager();
const axios = require('axios');


// Private fields
let self; // eslint-disable-line no-unused-vars
let library;
let modules;

let __private = {};

/**
 * Login logic.
 *
 * @class
 * @memberof logic
 * @param {function} params - Function Params
 **/


const processActions = {
    __register : async (params) => {
		try {
            let match = await MatchRepository.prototype.findMatchByExternalId(params.match_external_id);
            let bookedMatch = await BookedMatchRepository.prototype.findByMatchId(match._id);

            return {
                app            : params.app,
                match          : match._id,
                external_serie : match.serie_id,
                isRegister     : (bookedMatch == null)

            };
		} catch(err) {
			throw err;
		}
    },
    __remove : async (params) => {
		try {
            let match = await MatchRepository.prototype.findMatchByExternalId(params.match_external_id);
            let bookedMatch = await BookedMatchRepository.prototype.findByMatchId(match._id);
            if(!bookedMatch) {throwError("MATCH_NOT_EXISTENT")}
            return {
                app         : params.app,
                matchBooked : bookedMatch._id,
            };
		} catch(err) {
			throw err;
		}
	}
}

/**
 * Login logic.
 *
 * @class progressActions
 * @memberof logic
 * @param {function} params - Function Params
 **/


const progressActions = {
    __register : async (params) => {
		try {
            if(params.isRegister){
                await self.save(params);
            }
			return {status: true};
		} catch(err) {
			throw err;
		}
    },
    __remove : async (params) => {
		try {
            await BookedMatchRepository.prototype.removeByMatchId({_id: params.matchBooked, app: params.app})
			return {status: true};
		} catch(err) {
			throw err;
		}
	}
}

/**
 * Main BookedMatch logic.
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
 * @property {BookedMatch_model} model
 * @property {BookedMatch_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class BookedMatchLogic extends LogicComponent {
    constructor(scope) {
        super(scope);
        self = this;
        __private = {
            //ADD
            db: scope.db,
            __normalizedSelf: null
        };

        library = {
            process: processActions,
            progress: progressActions
        }
    }


    /**
	 * Validates BookedMatch schema.
	 *
	 * @param {BookedMatch} BookedMatch
	 * @returns {BookedMatch} BookedMatch
	 * @throws {string} On schema.validate failure
	 */
    async objectNormalize(params, processAction) {
        try {
            switch (processAction) {
                case 'Register' : {
					return library.process.__register(params); break;
                };
                case 'Remove' : {
					return library.process.__remove(params); break;
				};
            }
        } catch (err) {
            throw err;
        }
    }

	/**
	* Tests BookedMatch schema.
	*
	* @param {BookedMatch} BookedMatch
	* @returns {BookedMatch} BookedMatch
	* @throws {string} On schema.validate failure
	*/

    testParams(params, action) {
        try {
            error.bookedMatch(params, action);
        } catch (err) {
            throw err;
        }
    }

    async progress(params, progressAction) {
        try {
            switch (progressAction) {
                case 'Register' : {
					return await library.progress.__register(params);
                }
                case 'Remove' : {
					return await library.progress.__remove(params);
				}
            }
        } catch (err) {
            throw err;
        }
    }
}

// Export Default Module
export default BookedMatchLogic;