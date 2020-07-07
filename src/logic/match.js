import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { VideogameRepository, MatchRepository, SerieRepository, BookedMatchRepository } from '../db/repos';
import { PANDA_SCORE_TOKEN } from '../config';
import { PandaScoreSingleton } from '../helpers/matchVideogameSeries';
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
    __getSeriesMatches: async (params) => {
        let matches = await MatchRepository.prototype.findMatchBySerieId({
            serie_id: params.serie_id,
            status: params.status == undefined ? {} : { status_external: { $in: params.status } },
            begin_at: params.begin_at,
            end_at: params.end_at,
            offset: params.offset,
            size: params.size,
        });
        if (matches.length == 0) {
            return matches
        } else {
            let matchesId = []
            for (let match of matches) {
                matchesId.push(match.external_id)
            }
            let pandaScore = await axios.get(`https://api.pandascore.co/betting/matches?filter%5Bid%5D=${matchesId.toString()}&%5Bdetailed_stats%5D=true&per_page=${params.size}&token=${PANDA_SCORE_TOKEN}`);
            let resultBookedMatch = await BookedMatchRepository.prototype.findAll();
            pandaScore.data = pandaScore.data.map((match) => {
                let booked = resultBookedMatch.find((bookedMatch) => bookedMatch.external_match == match.id) != null;
                let odds = matches.find(resultMatch => resultMatch.external_id == match.id);
                return { ...match, booked, odds: odds.market }
            });
            return pandaScore.data;
        }
    },

    __getSpecificMatch: async (params) => {
        let pandaScore  = await axios.get(`https://api.pandascore.co/betting/matches/${params.match_id}?token=${PANDA_SCORE_TOKEN}`);
        let market      = await axios.get(`https://api.pandascore.co/betting/matches/${params.match_id}/markets?token=${PANDA_SCORE_TOKEN}`);
        let booked      = await BookedMatchRepository.prototype.findByExternalMatchId(params.match_id);
        return {
            ...pandaScore.data,
            odds: market.data,
            booked: booked!=null
        };
    },

    __getMatchesAll: async (params) => {
        let matches = await MatchRepository.prototype.findMatchAll({
            status: params.status == undefined ? {} : { status_external: { $in: params.status } },
            begin_at: params.begin_at,
            end_at: params.end_at,
            offset: params.offset,
            size: params.size,
        });
        if (matches.length == 0) {
            return matches
        } else {
            let matchesId = []
            for (let match of matches) {
                matchesId.push(match.external_id)
            }
            let pandaScore = await axios.get(`https://api.pandascore.co/betting/matches?filter%5Bid%5D=${matchesId.toString()}&per_page=${params.size}&token=${PANDA_SCORE_TOKEN}`);
            let resultBookedMatch = await BookedMatchRepository.prototype.findAll();
            pandaScore.data = pandaScore.data.map((match) => {
                let booked = resultBookedMatch.find((bookedMatch) => bookedMatch.external_match == match.id) != null;
                let odds = matches.find(resultMatch => resultMatch.external_id == match.id);
                return { ...match, booked, odds: odds.market }
            });
            return pandaScore.data;
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
    __getSeriesMatches: async (params) => {
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
    },

    __getMatchesAll: async (params) => {
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
                case 'GetSeriesMatches': {
                    return library.process.__getSeriesMatches(params); break;
                };
                case 'GetSpecificMatch': {
                    return library.process.__getSpecificMatch(params); break;
                };
                case 'GetMatchesAll': {
                    return library.process.__getMatchesAll(params); break;
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
                case 'GetSeriesMatches': {
                    return await library.progress.__getSeriesMatches(params);
                }
                case 'GetSpecificMatch': {
                    return await library.progress.__getSpecificMatch(params);
                }
                case 'GetMatchesAll': {
                    return await library.progress.__getMatchesAll(params);
                }
            }
        } catch (err) {
            throw err;
        }
    }
}

// Export Default Module
export default MatchLogic;