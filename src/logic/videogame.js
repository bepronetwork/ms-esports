import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { VideogameRepository, SerieRepository } from '../db/repos';
import { PANDA_SCORE_TOKEN } from '../config';
import { matchPandaScoreAndDatabase, PandaScore } from '../helpers/matchVideogameSeries';
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
	__getVideoGamesAll: async (params) => {
		let games = await VideogameRepository.prototype.findAllVideogame();
		for (let game of games) {
			let series = await SerieRepository.prototype.findSerieByGameId({ _id: game.external_id })
			let pandaScore = await axios.get(`https://api.pandascore.co/series/${game.slug}?token=${PANDA_SCORE_TOKEN}`)
			game["series"] = await PandaScore.prototype.matchPandaScoreAndDatabase({series, pandaScore});
		}
		return games;
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
	__getVideoGamesAll: async (params) => {
		try {
			return params;
		} catch (err) {
			throw err;
		}
	}
}

/**
 * Main Videogame logic.
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
 * @property {Videogame_model} model
 * @property {Videogame_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class VideogameLogic extends LogicComponent {
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
	 * Validates Videogame schema.
	 *
	 * @param {Videogame} Videogame
	 * @returns {Videogame} Videogame
	 * @throws {string} On schema.validate failure
	 */
	async objectNormalize(params, processAction) {
		try {
			switch (processAction) {
				case 'GetVideoGamesAll': {
					return library.process.__getVideoGamesAll(params); break;
				};
			}
		} catch (err) {
			throw err;
		}
	}

	/**
	* Tests Videogame schema.
	*
	* @param {Videogame} Videogame
	* @returns {Videogame} Videogame
	* @throws {string} On schema.validate failure
	*/

	testParams(params, action) {
		try {
			error.videogame(params, action);
		} catch (err) {
			throw err;
		}
	}



	async progress(params, progressAction) {
		try {
			switch (progressAction) {
				case 'GetVideoGamesAll': {
					return await library.progress.__getVideoGamesAll(params);
				}
			}
		} catch (err) {
			throw err;
		}
	}
}

// Export Default Module
export default VideogameLogic;