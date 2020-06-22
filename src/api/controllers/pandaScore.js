import {
    Videogame,
    Match
} from '../../models';
import MiddlewareSingleton from '../helpers/middleware';

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

async function getVideoGamesAll(req, res) {
    try {
        let params = req.body;
        let videogame = new Videogame(params);
        let data = await videogame.getVideoGamesAll();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getGameMatches(req, res) {
    try {
        let params = req.body;
        let match = new Match(params);
        let data = await match.getGameMatches();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getSpecificMatch(req, res) {
    try {
        let params = req.body;
        let match = new Match(params);
        let data = await match.getSpecificMatch();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

export {
    getVideoGamesAll,
    getGameMatches,
    getSpecificMatch
}