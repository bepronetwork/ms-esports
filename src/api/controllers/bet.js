import MiddlewareSingleton from '../helpers/middleware';
import SecuritySingleton from "../helpers/security";
import { BetEsports } from '../../models';

/**
 * Description of the function.
 *
 * @class
 * @memberof api.controllers.admins.postAdmin
 * @requires lodash
 * @requires helpers/apiError
 * @requires helpers/swagger.generateParamsErrorObject
 * @todo Add description of AdminsController
 */

async function createBet(req) {
    try {
        let bet = new BetEsports(req);
        let data = await bet.createBet();
        return data;
    } catch (err) {
        return err;
    }
}

async function confirmBets(req) {
    try {
        let bet = new BetEsports(req);
        let data = await bet.confirmBets();
    } catch (err) {
        return err;
    }
}

export {
    createBet,
    confirmBets
}