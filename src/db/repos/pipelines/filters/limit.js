import mongoose from 'mongoose';

const limit = ({ size }) => {
    return [
        {
            '$limit': (size > 10 || !size || size <= 0) ? 10 : size
        }
    ];
}


export {
    limit
}