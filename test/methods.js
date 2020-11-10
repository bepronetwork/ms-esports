import request from 'supertest';
import _ from 'lodash';
import axios from 'axios';
import { MS_MASTER_URL, MS_ESPORT_URL } from '../src/config';

module.exports = {
    async getVideogames(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/videogames/all')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getVideogamesLayout(params) {
        return request(global.server)
            .post('/api/get/videogames/layout')
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
    async getMatchLayout(params) {
        return request(global.server)
            .post('/api/get/matches/all/layout')
            .send(params)
            .then(res => detectServerError(res))
    },
    async getSeriesMatchesLayout(params) {
        return request(global.server)
            .post('/api/get/matches/series/layout')
            .send(params)
            .then(res => detectServerError(res))
    },
    async getSpecificMatchLayout(params) {
        return request(global.server)
            .post('/api/get/match/specific/layout')
            .send(params)
            .then(res => detectServerError(res))
    },
    async getTeamLayout(params) {
        return request(global.server)
            .post('/api/get/videogame/team/layout')
            .send(params)
            .then(res => detectServerError(res))
    },
    async getPlayerLayout(params) {
        return request(global.server)
            .post('/api/get/videogame/player/layout')
            .send(params)
            .then(res => detectServerError(res))
    },
    async getBookedMatches(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/booked/matches/all')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getBookedSeriesMatches(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/get/booked/matches/series')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async setBookedMatch(params, bearerToken, payload) {
        return request(global.server)
            .post('/api/set/matches/booked')
            .set("authorization", "Bearer " + bearerToken)
            .set("payload", getPayloadString(payload))
            .send(params)
            .then(res => detectServerError(res))
    },
    async getAppAuth(params, bearerToken, payload) {
        return (await axios.post(`${MS_MASTER_URL}/api/app/get/auth`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })).data
    },
    async addCurrencyWalletToApp(params, bearerToken, payload) {
        return await axios.post(`${MS_MASTER_URL}/api/app/wallet/currency/add`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })
    },
    async getSpecificMatchLayoutEsport(params, bearerToken, payload) {
        return (await axios.post(`${MS_ESPORT_URL}/api/get/match/specific/layout`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })).data
    },
    async getMatchLayoutEsport(params, bearerToken, payload) {
        return (await axios.post(`${MS_ESPORT_URL}/api/get/matches/all/layout`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })).data
    },
    async setBookedMatchEsport(params, bearerToken, payload) {
        return (await axios.post(`${MS_ESPORT_URL}/api/set/matches/booked`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })).data
    },
    async getMatchAllEsport(params, bearerToken, payload) {
        return (await axios.post(`${MS_ESPORT_URL}/api/get/matches/all`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })).data
    },
    async authAdmin(params, bearerToken, payload) {
        return (await axios.post(`${MS_MASTER_URL}/api/admins/auth`, params, {
            headers: {
                "authorization": `Bearer ${bearerToken}`,
                "payload": getPayloadString(payload)
            }
        })).data
    },
    async getEcosystemData() {
        return (await axios.get(`${MS_MASTER_URL}/api/ecosystem/all`)).data
    },
    async registerAdmin(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/admins/register`, params)).data;
    },
    async loginAdmin(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/admins/login`, params)).data;
    },
    async registerApp(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/app/create`, params)).data;
    },
    async registerUser(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/users/register`, params)).data
    },
    async loginUser(params) {
        return (await axios.post(`${MS_MASTER_URL}/api/users/login`, params)).data;
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