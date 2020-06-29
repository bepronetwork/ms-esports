import {
    Videogame,
    Match
} from '../../models';
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

async function getVideoGamesAll(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
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

async function getVideoGamesLayout(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'user', req });
        let params = req.body;
        let videogame = new Videogame(params);
        let data = await videogame.getVideoGamesLayout();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getTeam(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
        let params = req.body;
        let videogame = new Videogame(params);
        let data = await videogame.getTeam();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getPlayer(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
        let params = req.body;
        let videogame = new Videogame(params);
        let data = await videogame.getPlayer();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getSeriesMatches(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
        let params = req.body;
        let match = new Match(params);
        let data = await match.getSeriesMatches();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getMatchesAll(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
        let params = req.body;
        let match = new Match(params);
        let data = await match.getMatchesAll();
        MiddlewareSingleton.log({ type: "global", req, code: 200 });
        MiddlewareSingleton.respond(res, req, data);
    } catch (err) {
        MiddlewareSingleton.log({ type: "global", req, code: err.code });
        MiddlewareSingleton.respondError(res, err);
    }
}

async function getSpecificMatch(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
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

async function setBookedMatch(req, res) {
    try {
        await SecuritySingleton.verify({ type: 'admin', req, permissions: ["all"] });
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
    getSeriesMatches,
    getSpecificMatch,
    getMatchesAll,
    setBookedMatch,
    getVideoGamesLayout,
    getTeam,
    getPlayer
}