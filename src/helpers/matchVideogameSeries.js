class PandaScore {
    async matchPandaScoreAndDatabase({database, pandaScore}) {
        let listMatchSeries = [];
        for (let data of database) {
            let res = await pandaScore.find(panda_id => panda_id.id == data.external_id);
            if (res) {
                listMatchSeries.push(res);
            }
        }
        return listMatchSeries;
    }
}

const PandaScoreSingleton = new PandaScore();

export{
    PandaScoreSingleton
}