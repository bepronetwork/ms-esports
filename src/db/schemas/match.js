import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class MatchSchema{};

MatchSchema.prototype.name = 'Match';

MatchSchema.prototype.schema = {
    external_id     : {  type: Number, required : true},
    serie_id        : {  type: Number, required : true},
    videogame_id    : {  type: Number, required : true},
    serie           : {  type: mongoose.Schema.Types.ObjectId, ref: 'Serie'},
    videogame       : {  type: mongoose.Schema.Types.ObjectId, ref: 'Videogame'},
    status_external : {  type: String, required : true},
    game_date       : {  type: Date, required : true},
    market          : {  type: Array }
}

MatchSchema.prototype.model = db.model(MatchSchema.prototype.name, new db.Schema(MatchSchema.prototype.schema));
export {
    MatchSchema
}
