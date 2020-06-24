import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { VideogameRepository, MatchRepository, SerieRepository } from '../db/repos';
import { PANDA_SCORE_TOKEN } from '../config';
import { PandaScore } from '../helpers/matchVideogameSeries';
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
    __getGameMatches: async (params) => {
        let game = await MatchRepository.prototype.findMatchByGameId({ videogame_id: params.game_id });
        let serie = await MatchRepository.prototype.findMatchBySerieId({ serie_id: params.serie_id });
        if (serie.length > 0) { return serie }
        if (game.length > 0) { return game }
        return [];
    },

    __getSpecificMatch: async (params) => {
        let match = MatchRepository.prototype.findMatchById({ _id: params.match_id });
        if (!match) {
            throwError('MATCH_NOT_EXISTENT');
        }
        return match;
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
    __getGameMatches: async (params) => {
        try {
            return params;
        } catch (err) {
            throw err;
        }
    },

    __getSpecificMatch: async (params) => {
        try {
            return params;
        } catch (err) {
            throw err;
        }
    }
}

/**
 * Main Match logic.
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
 * @property {Match_model} model
 * @property {Match_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class MatchLogic extends LogicComponent {
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
	 * Validates Match schema.
	 *
	 * @param {Match} Match
	 * @returns {Match} Match
	 * @throws {string} On schema.validate failure
	 */
    async objectNormalize(params, processAction) {
        try {
            switch (processAction) {
                case 'GetGameMatches': {
                    return library.process.__getGameMatches(params); break;
                };
                case 'GetSpecificMatch': {
                    return library.process.__getSpecificMatch(params); break;
                };
            }
        } catch (err) {
            throw err;
        }
    }

	/**
	* Tests Match schema.
	*
	* @param {Match} Match
	* @returns {Match} Match
	* @throws {string} On schema.validate failure
	*/

    testParams(params, action) {
        try {
            error.match(params, action);
        } catch (err) {
            throw err;
        }
    }



    async progress(params, progressAction) {
        try {
            switch (progressAction) {
                case 'GetGameMatches': {
                    return await library.progress.__getGameMatches(params);
                }
                case 'GetSpecificMatch': {
                    return await library.progress.__getSpecificMatch(params);
                }
            }
        } catch (err) {
            throw err;
        }
    }
}

// Export Default Module
export default MatchLogic;