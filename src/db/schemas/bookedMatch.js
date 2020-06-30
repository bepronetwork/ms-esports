import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class BookedMatchSchema{};

BookedMatchSchema.prototype.name = 'BookedMatch';

BookedMatchSchema.prototype.schema = {
    match          : { type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
    app            : { type: mongoose.Schema.Types.ObjectId, ref: 'App'},
    external_serie : { type: Number, required: true}
}

BookedMatchSchema.prototype.model = db.model(BookedMatchSchema.prototype.name, new db.Schema(BookedMatchSchema.prototype.schema));
export {
    BookedMatchSchema
}