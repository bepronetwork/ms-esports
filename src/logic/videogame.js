import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { VideogameRepository, SerieRepository, UsersRepository, AppRepository } from '../db/repos';
import { PANDA_SCORE_TOKEN } from '../config';
import { PandaScoreSingleton } from '../helpers/matchVideogameSeries';
import { throwError } from '../controllers/Errors/ErrorManager';
import { Promise } from 'bluebird';
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
		let series = await SerieRepository.prototype.findAll();
		games = games.map((game) => {
			let seriesResult = series.filter((serie) => serie.videogame_id == game.external_id);
			return { ...game, series: seriesResult };
		});
		return games;
	},

	__getVideoGamesLayout: async (params) => {
		let games = await VideogameRepository.prototype.findAllVideogame();
		let series = await SerieRepository.prototype.findAllWithSerieEnded();
		games = games.map((game) => {
			let seriesResult = series.filter((serie) => serie.videogame_id == game.external_id);
			return { ...game, series: seriesResult };
		});
		return games;
	},

	__getTeam: async (params) => {
		let game = await VideogameRepository.prototype.findVideogameBySlug(params.slug);
		let pandaScore = await axios.get(`https://api.pandascore.co/${game.meta_name}/teams/${params.team_id}/stats?token=${PANDA_SCORE_TOKEN}`);
		return pandaScore.data;
	},

	__getPlayer: async (params) => {
		let game = await VideogameRepository.prototype.findVideogameBySlug(params.slug);
		let pandaScore = await axios.get(`https://api.pandascore.co/${game.meta_name}/players/${params.player_id}/stats?token=${PANDA_SCORE_TOKEN}`);
		return pandaScore.data;
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
	},
	__getVideoGamesLayout: async (params) => {
		try {
			return params;
		} catch (err) {
			throw err;
		}
	},
	__getTeam: async (params) => {
		try {
			return params;
		} catch (err) {
			throw err;
		}
	},

	__getPlayer: async (params) => {
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
				case 'GetVideoGamesLayout': {
					return library.process.__getVideoGamesLayout(params); break;
				};
				case 'GetTeam': {
					return library.process.__getTeam(params); break;
				};
				case 'GetPlayer': {
					return library.process.__getPlayer(params); break;
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
				case 'GetVideoGamesLayout': {
					return library.progress.__getVideoGamesLayout(params); break;
				}
				case 'GetTeam': {
					return library.progress.__getTeam(params); break;
				};
				case 'GetPlayer': {
					return library.progress.__getPlayer(params); break;
				};
			}
		} catch (err) {
			throw err;
		}
	}
}

// Export Default Module
export default VideogameLogic;