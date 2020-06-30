import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { BookedMatchRepository, UsersRepository, AppRepository, VideogameRepository } from '../db/repos';
import { PANDA_SCORE_TOKEN } from '../config';
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
    __register: async (params) => {
        try {
            return;
        } catch (err) {
            throw err;
        }
    },

    __getMatchesLayout: async (params) => {
        try {
            let user = await UsersRepository.prototype.findUserById(params.user);
            if (!user) { throwError('USER_NOT_EXISTENT') }
            const app = await AppRepository.prototype.findAppById(user.app_id);
            if (!app) { throwError("APP_NOT_EXISTENT") }
            let matches = await BookedMatchRepository.prototype.findMatchAll({
                offset: params.offset,
                size: params.size,
            });
            let matchesId = []
            for (let matchResult of matches) {
                matchesId.push(matchResult.match.external_id)
            }
            let pandaScore = await axios.get(`https://api.pandascore.co/matches?filter%5Bid%5D=${matchesId.toString()}&per_page=${params.size}&token=${PANDA_SCORE_TOKEN}`);
            return pandaScore.data;
        } catch (err) {
            throw err;
        }
    },

    __getSeriesMatchesLayout: async (params) => {
        try {
            let user = await UsersRepository.prototype.findUserById(params.user);
            if (!user) { throwError('USER_NOT_EXISTENT') }
            const app = await AppRepository.prototype.findAppById(user.app_id);
            if (!app) { throwError("APP_NOT_EXISTENT") }
            let matches = await BookedMatchRepository.prototype.findMatchBySerieId({
                external_serie: params.serie_id,
                offset: params.offset,
                size: params.size,
            });
            let matchesId = []
            for (let matchResult of matches) {
                matchesId.push(matchResult.match.external_id)
            }
            let pandaScore = await axios.get(`https://api.pandascore.co/matches?filter%5Bid%5D=${matchesId.toString()}&%5Bdetailed_stats%5D=true&per_page=${params.size}&token=${PANDA_SCORE_TOKEN}`);
            return pandaScore.data;
        } catch (err) {
            throw err;
        }
    },

    __getSpecificMatchLayout: async (params) => {
        try {
            let user = await UsersRepository.prototype.findUserById(params.user);
            if (!user) { throwError('USER_NOT_EXISTENT') }
            const app = await AppRepository.prototype.findAppById(user.app_id);
            if (!app) { throwError("APP_NOT_EXISTENT") }
            let pandaScore = await axios.get(`https://api.pandascore.co/matches/${params.match_id}?token=${PANDA_SCORE_TOKEN}`);
            return pandaScore.data;
        } catch (err) {
            throw err;
        }
    },

    __getTeamLayout: async (params) => {
        try {
            let user = await UsersRepository.prototype.findUserById(params.user);
            if (!user) { throwError('USER_NOT_EXISTENT') }
            const app = await AppRepository.prototype.findAppById(user.app_id);
            if (!app) { throwError("APP_NOT_EXISTENT") }
            let game = await VideogameRepository.prototype.findVideogameBySlug(params.slug);
            let pandaScore = await axios.get(`https://api.pandascore.co/${game.meta_name}/teams/${params.team_id}/stats?token=${PANDA_SCORE_TOKEN}`);
            return pandaScore.data;
        } catch (err) {
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
    __register: async (params) => {
        try {
            let bookedMatch = await self.save(params);
            return { status: true };
        } catch (err) {
            throw err;
        }
    },

    __getMatchesLayout: async (params) => {
        try {
            return params;
        } catch (err) {
            throw err;
        }
    },

    __getSeriesMatchesLayout: async (params) => {
        try {
            return params;
        } catch (err) {
            throw err;
        }
    },

    __getSpecificMatchLayout: async (params) => {
        try {
            return params;
        } catch (err) {
            throw err;
        }
    },

    __getTeamLayout: async (params) => {
        try {
            return params;
        } catch (err) {
            throw err;
        }
    },
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
                case 'Register': {
                    return library.process.__register(params); break;
                };
                case 'GetMatchesLayout': {
                    return library.process.__getMatchesLayout(params); break;
                };
                case 'GetSeriesMatchesLayout': {
                    return library.process.__getSeriesMatchesLayout(params); break;
                };
                case 'GetSpecificMatchLayout': {
                    return library.process.__getSpecificMatchLayout(params); break;
                };
                case 'GetTeamLayout': {
                    return library.process.__getTeamLayout(params); break;
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
                case 'Register': {
                    return await library.progress.__register(params);
                }
                case 'GetMatchesLayout': {
                    return library.progress.__getMatchesLayout(params); break;
                };
                case 'GetSeriesMatchesLayout': {
                    return library.progress.__getSeriesMatchesLayout(params); break;
                };
                case 'GetSpecificMatchLayout': {
                    return library.progress.__getSpecificMatchLayout(params); break;
                };
                case 'GetTeamLayout': {
                    return library.progress.__getTeamLayout(params); break;
                };
            }
        } catch (err) {
            throw err;
        }
    }
}

// Export Default Module
export default BookedMatchLogic;