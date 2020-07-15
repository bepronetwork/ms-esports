let self;


/**
 * @Outputs
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    videogamesAll: (object) => {
        return object.map(object => {
            return ({
                "_id": object._id,
                "external_id": object.external_id,
                "name": object.name,
                "slug": object.slug,
                "image": object.image,
                "meta_name": object.meta_name,
                "series": !object.series ? [] : object.series.map(serie => {
                    return ({
                        "_id": serie._id,
                        "tournaments": !serie.tournaments ? [] : serie.tournaments.map(tournament => {
                            return ({
                                "begin_at": tournament.begin_at,
                                "end_at": tournament.end_at,
                                "id": tournament.id,
                                "live_supported": tournament.live_supported,
                                "modified_at": tournament.modified_at,
                                "name": tournament.name,
                                "prizepool": tournament.prizepool,
                                "serie_id": tournament.serie_id,
                                "slug": tournament.slug,
                                "winner_id": tournament.winner_id,
                                "winner_type": tournament.winner_type
                            })
                        }),
                        "begin_at": serie.begin_at,
                        "description": serie.description,
                        "end_at": serie.end_at,
                        "full_name": serie.full_name,
                        "id": serie.id,
                        "league": !serie.league ? {} : {
                            "id": serie.league.id,
                            "image_url": serie.league.image_url,
                            "modified_at": serie.league.modified_at,
                            "name": serie.league.name,
                            "slug": serie.league.slug,
                            "url": serie.league.url
                        },
                        "league_id": serie.league_id,
                        "name": serie.name,
                        "season": serie.season,
                        "slug": serie.slug,
                        "tier": serie.tier,
                        "videogame": serie.videogame,
                        "winner_id": serie.winner_id,
                        "winner_type": serie.winner_type,
                        "year": serie.year,
                        "external_id": serie.external_id,
                        "videogame_id": serie.videogame_id,
                        "__v": serie.__v
                    })
                })
            })
        })
    },
}


class MapperVideogamesAll {

    constructor() {
        self = {
            outputs: outputs
        }

        /**
         * @object KEYS for Output Mapping
         * @key Input of Output Function <-> Output for Extern of the API
         * @value Output of Function in Outputs
         */

        this.KEYS = {
            VideogamesAll: 'videogamesAll'
        }
    }

    output(key, value) {
        try {
            return self.outputs[this.KEYS[key]](value);
        } catch (err) {
            throw err;
        }
    }
}

let MapperVideogamesAllSingleton = new MapperVideogamesAll();

export {
    MapperVideogamesAllSingleton
}