import mongoose from 'mongoose';
import { limit } from './filters/limit';
import { skip } from './filters/skip';
import { filter_status_match } from './filters/match_status';
import { filter_app } from './filters/app';


const pipeline_matches_by_series = ({ external_serie, app, status, offset, size, begin_at, end_at, sort }) =>
    [
        {
            '$match': {
                'external_serie': {
                    '$in': external_serie
                },
                'game_date': {
                    '$gte': new Date(begin_at),
                    '$lte': new Date(end_at)
                },
                ...filter_app(app.app)
            }
        }, {
            '$sort': {
                'game_date': sort
            }
        }, {
            '$lookup': {
                'from': 'matches',
                'localField': 'match',
                'foreignField': '_id',
                'as': 'match'
            }
        }, {
            '$unwind': {
                'path': '$match'
            }
        },
        ...filter_status_match({ status }),
        ...skip({ offset }),
        ...limit({ size })
    ]

export default pipeline_matches_by_series;