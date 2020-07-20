import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import UsersRepository from '../db/repos/user';
import { WalletsRepository, BetEsportsRepository, MatchRepository, BookedMatchRepository, AppRepository, BetResultSpacesRepository } from '../db/repos';
import {BetResultSpace} from "../models";
import { throwError } from '../controllers/Errors/ErrorManager';
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

const checkWinner = {
	winnerTwoWay   : (betResult, param)=>{
		if(betResult.participantId == param.winner) return true;
		return false;
	},
	winnerThreeWay : (betResult, param)=>{
		if(betResult.participantId == param.winner) return true;
		return false;
	}
}


const processActions = {
	// params : { betResultId, matchId, winner }
	__confirmBets: async (params) => {
		try {
			let betResult = await BetResultSpacesRepository.prototype.findById(params.betResultId);
			let betEsport = await BetEsportsRepository.prototype.findByBetResultId(params.betResultId);
			let match  	  = await MatchRepository.prototype.findById(params.matchId);

			// check id user exist
			const user = await UsersRepository.prototype.findUserByIdAndApp({ _id: match.user, app_id: match.app })
			if (!user) { throwError("USER_NOT_EXISTENT") }

			// check id app exist
			const app = await AppRepository.prototype.findAppById(match.app);
			if (!app) { throwError("APP_NOT_EXISTENT") }

			// check id currency exist
			const appWallet = app.wallet.find(w => new String(w.currency._id).toString() == new String(betEsport.currency).toString());
			if (!appWallet) { throwError("WALLET_NOT_EXISTENT") }

			// check id currency exist
			const userWallet = user.wallet.find(w => new String(w.currency._id).toString() == new String(betEsport.currency).toString());
			if (!userWallet) { throwError("WALLET_NOT_EXISTENT") }

			let isWonThatMatch = checkWinner[betResult.marketType](betResult, params);

			let fakeResult = betEsport.result.map((res) => {
				if(res._id == params.betResultId) {
					res.finished = true;
					res.status   = (isWonThatMatch===true) ? "gain" : "loss";
				}
				return {
					match 			: res.match,
					marketType 		: res.marketType,
					betType 		: res.betType,
					participantId 	: res.participantId,
					statistic 		: res.statistic,
					finished 		: res.finished,
					status 			: res.status
				};
			});

			const cameToAnEnd = (fakeResult.find((res) => res.status=="pending")) == null ? true : false;
			const isWon       = (((fakeResult.find((res) => res.status=="loss")) == null ? true : false) && cameToAnEnd);
			let winAmount     = 0;
			if(isWon) {
				const odd = fakeResult.reduce(( accumulator, valueCurrent ) => accumulator * valueCurrent.statistic, 1);
				winAmount = (betEsport.betAmount) * odd;
			}

			return {
				winAmount,
				isWon,
				isWonThatMatch,
				appWallet,
				userWallet,
				betResult,
				cameToAnEnd,
				betEsport
			};

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
	 * 		- matchId  		: String
	 *      - marketType 	: String - Ex.: winnerTwoWay || winnerThreeWay...
	 *      - betType 		: Number - Ex.: 0 || 1 || 2...
	 *      - statistic     : Number
	 * 	- user 			: String
	 * 	- betAmount 	: Number
	 * 	- currency      : String
	 **/
	__createBet: async (params) => {
		// check id app exist
		const app = await AppRepository.prototype.findAppById(params.app);
		if (!app) { throwError("APP_NOT_EXISTENT") }

		// check if all match exist
		let resultSpace = params.resultSpace.map(async (result) => {
			let resultLocal = (await BookedMatchRepository.prototype.findMatchByIdAndApp({ match: result.matchId, app: app._id }));
			console.log("]0", resultLocal);
			return (resultLocal!=null || resultLocal!=undefined) ? {...result, ...resultLocal} : false;
		});
		resultSpace = await Promise.all(resultSpace);
		if (resultSpace.indexOf(false)!=-1) { throwError("MATCH_NOT_EXISTENT") }

		// check user exist in app
		const user = await UsersRepository.prototype.findUserByIdAndApp({ _id: params.user, app_id: app._id })
		if (!user) { throwError("USER_NOT_EXISTENT") }

		// check wallet exist and funds is sufficient
		const userWallet = user.wallet.find(w => new String(w.currency._id).toString() == new String(params.currency).toString());
		if (!userWallet) { throwError("WALLET_NOT_EXISTENT") }
		if (userWallet.playBalance < params.betAmount) { throwError("INSUFFICIENT_FUNDS") }

		// check if probability is valid
		for(let res of resultSpace) {
			if (res.odds[res.marketType][res.betType].probability != res.statistic) { throwError("WRONG_PROBABILITY") }
			res["participantId"] = res.odds[res.marketType][res.betType].participant_id;
		}

		// list videogames
		const videoGames = resultSpace.map((res) => res.match.videogame);
		console.log("1", resultSpace);

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
			let { betEsport, winAmount, isWon, isWonThatMatch, appWallet, userWallet, betResult, cameToAnEnd } = params;

			await BetResultSpacesRepository.prototype.updateStatus(betResult._id, {
				status: isWonThatMatch ? "gain" : "loss",
				finished : true
			});
			if(!cameToAnEnd) return;
			await BetEsportsRepository.prototype.updateResultEnd(betEsport._id, {winAmount, isWon});
			if(isWon) {
				await WalletsRepository.prototype.updatePlayBalance(appWallet._id, -winAmount);
				await WalletsRepository.prototype.updatePlayBalance(userWallet._id, (winAmount+betEsport.betAmount));
			} else {
				await WalletsRepository.prototype.updatePlayBalance(appWallet._id, betEsport.betAmount);
			}
			return;
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
				betAmount,
				app,
				user,
				currency,
				result,
				type,
				videogames: videoGames,
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