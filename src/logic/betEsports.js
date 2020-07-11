import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import BookedMatchRepository from '../db/repos/bookedMatch';
import UsersRepository from '../db/repos/user';
import { WalletsRepository } from '../db/repos';
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
	__createBet: async (params) => {
		const app = await AppRepository.prototype.findAppById(params.app);
		if (!app) { throwError("APP_NOT_EXISTENT") }
		const match = await BookedMatchRepository.prototype.findMatchByIdAndApp({ _id: params.match, app: app._id });
		if (!match) { throwError("MATCH_NOT_EXISTENT") }
		const user = await UsersRepository.prototype.findUserByIdAndApp({ _id: params.user, app: app._id })
		if (!user) { throwError("USER_NOT_EXISTENT") }
		let userWallet = user.wallet.find(w => new String(w.currency._id).toString() == new String(currency).toString());
		if (!userWallet) { throwError("WALLET_NOT_EXISTENT") }
		if (userWallet.playBalance < params.betAmount) { throwError("INSUFFICIENT_FUNDS") }
		if (match.odds[params.marketMetaTag].probability != params.statistic) { throwError("WRONG_PROBABILITY") }
		let normalized = {
			betAmount: params.betAmount,
			match: params.match,
			app: params.app,
			user: params.user,
			currency: params.currency,
			wallet: params.wallet,
			market: params.market,
			selected: params.selected,
			statistic: params.statistic,
			userWallet
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
	__createBet: async (params) => {
		try {
			var { betAmount, match, app, user, currency, wallet, market, selected, statistic, userWallet } = params
			let bet = {
				betAmount,
				match,
				app,
				user,
				currency,
				wallet,
				market,
				selected,
				statistic
			}
			await self.save(bet);
			let negativeBetAmount = (Math.abs(betAmount) * -1);
			await WalletsRepository.prototype.updatePlayBalance(userWallet._id, negativeBetAmount);
			return true;
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
			}
		} catch (err) {
			throw err;
		}
	}
}

// Export Default Module
export default BetEsportsLogic;