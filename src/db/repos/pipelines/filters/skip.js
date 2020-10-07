import mongoose from 'mongoose';

const skip = ({ offset }) => {
    return [
        {
            '$skip': offset == undefined ? 0 : offset
        }
    ];
}


export {
    skip
}