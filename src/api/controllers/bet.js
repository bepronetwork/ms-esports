import MiddlewareSingleton from '../helpers/middleware';
import SecuritySingleton from "../helpers/security";

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
        return true;
    } catch (err) {
        return false;
    }
}

async function confirmBets(req) {
    try {
        return true;
    } catch (err) {
        return false;
    }
}

export {
    createBet,
    confirmBets
}