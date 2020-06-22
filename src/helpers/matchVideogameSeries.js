class PandaScore {
    async matchPandaScoreAndDatabase(series, pandaScore) {
        var listMatchSeries = [];
        for (let serie of series) {
            let res = await pandaScore.find(panda_id => panda_id.id == serie.external_id);
            if (res) {
                listMatchSeries.push(res);
            }
        }
        return listMatchSeries;
    }
}

export{
    PandaScore
}