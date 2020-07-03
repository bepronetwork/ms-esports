import mongoose from 'mongoose';

const filter_app = (app) => {
    if (!app) { return {} };
    return { 'app': mongoose.Types.ObjectId(app) }
}


export {
    filter_app
}