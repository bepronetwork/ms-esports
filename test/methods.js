import request from 'supertest';
import _ from 'lodash';

module.exports = {
    async getVideogames(params) {
        return request(global.server)
        .post('/api/get/videogames/all')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getGameMatches(params) {
        return request(global.server)
        .post('/api/get/matches/games')
        .send(params)
        .then(res => detectServerError(res))
    },
    async getSpecificMatch(params) {
        return request(global.server)
        .post('/api/get/match/specific')
        .send(params)
        .then(res => detectServerError(res))
    },
    async pingPost(params, bearerToken, payload){
        return request(global.server)
        .post('/api/status/post')
        .set("authorization", "Bearer " + bearerToken)
        .set("payload", getPayloadString(payload))
        .send(params)
        .then(res => detectServerError(res))
    },
};



function getPayloadString(payloadObject){
    if(!payloadObject){return null}
    return JSON.stringify({ id : payloadObject.id })
}


function detectServerError(res){
    if(res.body && !_.isEmpty(res.body)){
        // Nothing
    }else{
        //Error on Server that does not show on testing since mocha hides server logs sometimes 
        console.log(res.error);
    }

    return res.body;
}