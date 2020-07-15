let self;


/**
 * @Outputs
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    matchesAll: (object) => {
        return object.map(object => {
            return ({
                "modified_at": object.modified_at,
                "slug": object.slug,
                "official_stream_url": object.official_stream_url,
                "tournament_id": object.tournament_id,
                "opponents": !object.opponents ? [] : object.opponents.map(opponent_object => {
                    return ({
                        "type": opponent_object.type,
                        "opponent": !opponent_object.opponent ? {} : {
                            "acronym": opponent_object.opponent.acronym,
                            "id": opponent_object.opponent.id,
                            "image_url": opponent_object.opponent.image_url,
                            "location": opponent_object.opponent.location,
                            "modified_at": opponent_object.opponent.modified_at,
                            "name": opponent_object.opponent.name,
                            "slug": opponent_object.opponent.slug,
                        },
                    })
                }),
                "live": !object.live ? {} : {
                    "opens_at": object.live.opens_at,
                    "supported": object.live.supported,
                    "url": object.live.url
                },
                "status": object.status,
                "betting_metadata": !object.betting_metadata ? {} : {
                    "betting_group": !object.betting_metadata.betting_group ? {} : {
                        "id": object.betting_metadata.betting_group.id,
                        "name": object.betting_metadata.betting_group.name,
                    },
                    "bookable": object.betting_metadata.bookable,
                    "booked": object.betting_metadata.booked,
                    "live_available": object.betting_metadata.live_available,
                    "markets_created": object.betting_metadata.markets_created,
                    "markets_updated_at": object.betting_metadata.markets_updated_at,
                    "pandascore_reviewed": object.betting_metadata.pandascore_reviewed,
                    "settled": object.betting_metadata.settled
                },
                "number_of_games": object.number_of_games,
                "league_id": object.league_id,
                "league": object.league,
                "game_advantage": object.game_advantage,
                "forfeit": object.forfeit,
                "draw": object.draw,
                "serie": object.serie,
                "live_url": object.live_url,
                "winner": object.winner,
                "winner_id": object.winner_id,
                "name": object.name,
                "begin_at": object.begin_at,
                "streams": object.streams,
                "live_embed_url": object.live_embed_url,
                "original_scheduled_at": object.original_scheduled_at,
                "results": object.results,
                "videogame": object.videogame,
                "rescheduled": object.rescheduled,
                "serie_id": object.serie_id,
                "match_type": object.match_type,
                "detailed_stats": object.detailed_stats,
                "id": object.id,
                "games": object.games,
                "videogame_version": object.videogame_version,
                "tournament": object.tournament,
                "scheduled_at": object.scheduled_at,
                "end_at": object.end_at,
                "booked": object.booked,
                "odds": object.odds,
            })
        })
    },
}


class MapperMatchesAll {

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
            MatchesAll: 'matchesAll'
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

let MapperMatchesAllSingleton = new MapperMatchesAll();

export {
    MapperMatchesAllSingleton
}