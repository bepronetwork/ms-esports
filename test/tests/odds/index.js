import chai from 'chai';
import { PANDA_SCORE_TOKEN } from '../../../src/config';
import MatchRepository from '../../../src/db/repos/match';
const axios = require('axios').default;
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Database and PandaScore Comparison', async () => {

    it('should verify if Database Odds Equal To PandaScore Odds', mochaAsync(async () => {
        const matches = await MatchRepository.prototype.findMatchToTest("pre_match");
        for (let match of matches) {
            const market = (await axios.get(`https://api.pandascore.co/betting/matches/${match.external_id}/markets?token=${PANDA_SCORE_TOKEN}`)).data;
            
            //Market from Database Winner-2-way
            let oddWinnerTwoWayMatch = match.market.find((match_result) => match_result.template == "winner-2-way");
            oddWinnerTwoWayMatch = oddWinnerTwoWayMatch == null ? [] : oddWinnerTwoWayMatch.selections;
            
            //Probability from Database Winner-2-way
            const firstTeamTwoWayMatchProbability = !oddWinnerTwoWayMatch[0] ? null : oddWinnerTwoWayMatch[0].probability;
            const secondTeamTwoWayMatchProbability = !oddWinnerTwoWayMatch[1] ? null : oddWinnerTwoWayMatch[1].probability;
            
            //Market from Database Winner-3-way
            let oddWinnerThreeWayMatch = match.market.find((match_result) => match_result.template == "winner-3-way");
            oddWinnerThreeWayMatch = oddWinnerThreeWayMatch == null ? [] : oddWinnerThreeWayMatch.selections;
            
            //Probability from Database Winner-3-way
            const firstTeamThreeWayMatchProbability = !oddWinnerThreeWayMatch[0] ? null : oddWinnerThreeWayMatch[0].probability;
            const tieThreeWayMatchProbability = !oddWinnerThreeWayMatch[1] ? null : oddWinnerThreeWayMatch[1].probability;
            const secondTeamThreeWayMatchProbability = !oddWinnerThreeWayMatch[2] ? null : oddWinnerThreeWayMatch[2].probability;
            
            //Market from PandaScore Winner-2-way
            let oddWinnerTwoWayMarket = market.markets.find((market_result) => market_result.template == "winner-2-way");
            oddWinnerTwoWayMarket = oddWinnerTwoWayMarket == null ? [] : oddWinnerTwoWayMarket.selections;
            
            //Probability from PandaScore Winner-2-way
            const firstTeamTwoWayMarketProbability = !oddWinnerTwoWayMarket[0] ? null : oddWinnerTwoWayMarket[0].probability;
            const secondTeamTwoWayMarketProbability = !oddWinnerTwoWayMarket[1] ? null : oddWinnerTwoWayMarket[1].probability;
            
            //Market from PandaScore Winner-3-way
            let oddWinnerThreeWayMarket = market.markets.find((market_result) => market_result.template == "winner-3-way");
            oddWinnerThreeWayMarket = oddWinnerThreeWayMarket == null ? [] : oddWinnerThreeWayMarket.selections;
            
            //Probability from PandaScore Winner-3-way
            const firstTeamThreeWayMarketProbability = !oddWinnerThreeWayMarket[0] ? null : oddWinnerThreeWayMarket[0].probability;
            const tieThreeWayMarketProbability = !oddWinnerThreeWayMarket[1] ? null : oddWinnerThreeWayMarket[1].probability;
            const secondTeamThreeWayMarketProbability = !oddWinnerThreeWayMarket[2] ? null : oddWinnerThreeWayMarket[2].probability;
            //Comparisons between probabilities
            expect(firstTeamTwoWayMatchProbability).to.equal(firstTeamTwoWayMarketProbability);
            expect(secondTeamTwoWayMatchProbability).to.equal(secondTeamTwoWayMarketProbability);
            expect(firstTeamThreeWayMatchProbability).to.equal(firstTeamThreeWayMarketProbability);
            expect(tieThreeWayMatchProbability).to.equal(tieThreeWayMarketProbability);
            expect(secondTeamThreeWayMatchProbability).to.equal(secondTeamThreeWayMarketProbability);
        }
    }));

    it('should verify if Database Status Equal To PandaScore Status - Postponed', mochaAsync(async () => {
        const matches = await MatchRepository.prototype.findMatchToTest("postponed");
        if(matches.length == 0){
            expect(matches.length).to.equal(0);
        } else {
            for (let match of matches) {
                const matchPanda = (await axios.get(`https://api.pandascore.co/betting/matches/${match.external_id}?token=${PANDA_SCORE_TOKEN}`)).data;
                expect(match.status_external).to.equal(matchPanda.status);
            }
        }
    }));

    it('should verify if Database Status Equal To PandaScore Status - Canceled', mochaAsync(async () => {
        const matches = await MatchRepository.prototype.findMatchToTest("canceled");
        if(matches.length == 0){
            expect(matches.length).to.equal(0);
        } else {
            for (let match of matches) {
                const matchPanda = (await axios.get(`https://api.pandascore.co/betting/matches/${match.external_id}?token=${PANDA_SCORE_TOKEN}`)).data;
                expect(match.status_external).to.equal(matchPanda.status);
            }
        }
    }));
})
