import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import BookedMatchRepository from '../db/repos/bookedMatch';
import UsersRepository from '../db/repos/user';
import { WalletsRepository } from '../db/repos';
import {BetResultSpace} from "../models"
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
	__confirmBets: async (params) => {
		try {
		
		} catch (err) {
			throw err;
		}
	},
	/**
	 * LogicCreateBet.
	 *
	 * @method
	 * @param {function} params
	 * 	- app 			: String
	 * 	- resultSpace 	: Array<JSON>
	 * 		- match  		: String
	 *      - market 		: String - Ex.: winnerTwoWay || winnerThreeWay...
	 *      - betType 		: Number - Ex.: 0 || 1 || 2...
	 *      - statistic     : Number
	 *      - finished      : Boolean
	 * 	- user 			: String
	 * 	- betAmount 	: Number
	 * 	- currency      : String
	 **/
	__createBet: async (params) => {
		// check id app exist
		const app = await AppRepository.prototype.findAppById(params.app);
		if (!app) { throwError("APP_NOT_EXISTENT") }

		// check if all match exist
		const resultSpace = params.resultSpace.map((result) => {
			let resultLocal = (await BookedMatchRepository.prototype.findMatchByIdAndApp({ _id: result.matchId, app: app._id }));
			return (resultLocal!=null || resultLocal!=undefined) ? {...result, ...resultLocal} : false;
		});
		if (resultSpace.indexOf(false)!=-1) { throwError("MATCH_NOT_EXISTENT") }

		// check user exist in app
		const user = await UsersRepository.prototype.findUserByIdAndApp({ _id: params.user, app: app._id })
		if (!user) { throwError("USER_NOT_EXISTENT") }

		// check wallet exist and funds is sufficient
		const userWallet = user.wallet.find(w => new String(w.currency._id).toString() == new String(params.currency).toString());
		if (!userWallet) { throwError("WALLET_NOT_EXISTENT") }
		if (userWallet.playBalance < params.betAmount) { throwError("INSUFFICIENT_FUNDS") }

		// check if probability is valid
		for(let res of resultSpace) {
			if (res.odds[res.marketType][res.betType].probability != res.statistic) { throwError("WRONG_PROBABILITY") }
		}

		// list videogames
		const videoGames = resultSpace.map((res) => res.match.videogame);

		// check type bet is simple or multiple (if videoGames.length==1 then simple, if not, then multiple, because if <=0 then it should have gone wrong already in conditions bef)
		let type = videoGames.length == 1 ? "simple" : "multiple";

		const normalized = {
			betAmount 	: params.betAmount,
			app 		: params.app,
			user 		: params.user,
			currency 	: params.currency,
			type,
			userWallet,
			resultSpace,
			videoGames
		}
		return normalized;
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
	__confirmBets: async (params) => {
		try {

		} catch (err) {
			throw err;
		}
	},
	__createBet: async (params) => {
		try {
			var {
				betAmount,
				app,
				user,
				currency,
				type,
				userWallet,
				resultSpace,
				videoGames
			} = params;

			let dependentObjects = resultSpace.map( async item => {
				return await (new BetResultSpace(item).register());
			});
	
			let result = await Promise.all(dependentObjects);

			let bet = {
				videoGames,
				betAmount,
				app,
				user,
				currency,
				result,
				type
			}

			await self.save(bet);
			let negativeBetAmount = (Math.abs(betAmount) * -1);
			await WalletsRepository.prototype.updatePlayBalance(userWallet._id, negativeBetAmount);
			return {success: true};
		} catch (err) {
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
			db: scope.db,
			__normalizedSelf: null
		};

		library = {
			process: processActions,
			progress: progressActions
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
		try {
			switch (processAction) {
				case 'CreateBet': {
					return library.process.__createBet(params); break;
				};
				case 'ConfirmBets': {
					return library.process.__confirmBets(params); break;
				};
			}
		} catch (err) {
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

	testParams(params, action) {
		try {
			error.betEsports(params, action);
		} catch (err) {
			throw err;
		}
	}



	async progress(params, progressAction) {
		try {
			switch (progressAction) {
				case 'CreateBet': {
					return await library.progress.__createBet(params);
				}
				case 'ConfirmBets': {
					return await library.progress.__confirmBets(params);
				}
			}
		} catch (err) {
			throw err;
		}
	}
}

// Export Default Module
export default BetEsportsLogic;