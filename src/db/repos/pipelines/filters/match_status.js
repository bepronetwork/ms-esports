import mongoose from 'mongoose';

const filter_status_match = ({ status }) => {
    if (!status) { return {} };
    return [
        {
            '$match': {
                'match.status_external': {
                    '$in': status
                }
            }
        }
    ];
}


export {
    filter_status_match
}