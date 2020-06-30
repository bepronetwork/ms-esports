import request from 'supertest';
import _ from 'lodash';
import axios from 'axios';
import { MS_MASTER_URL } from '../src/config';

module.exports = {
    async getVideogames(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/videogames/all')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getVideogamesLayout(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/videogames/layout')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getTeam(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/videogame/team')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getPlayer(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/videogame/player')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getSeriesMatches(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/matches/series')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getSpecificMatch(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/match/specific')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getMatchAll(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/matches/all')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getMatchLayout(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/matches/all/layout')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getSeriesMatchesLayout(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/matches/series/layout')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getSpecificMatchLayout(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/match/specific/layout')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getTeamLayout(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/videogame/team/layout')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async registerAdmin(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/admins/register`, params)).data;
    },
    async loginAdmin(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/admins/login`, params)).data;
    },
    async pingPost(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/status/post')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
};

function getPayloadString(payloadObject) {
    if (!payloadObject) { return null }
    return JSON.stringify({ id: payloadObject.id })
}


function detectServerError(res) {
    if (res.body && !_.isEmpty(res.body)) {
        // Nothing
    } else {
        //Error on Server that does not show on testing since mocha hides server logs sometimes 
        console.log(res.error);
    }

    return res.body;
}