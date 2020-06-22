import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class MatchSchema{};

MatchSchema.prototype.name = 'Match';

MatchSchema.prototype.schema = {
    external_id   : {  type: Number, required : true},
    serie_id      : {  type: Number, required : true},
    videogame_id  : {  type: Number, required : true},
    serie         : { type: mongoose.Schema.Types.ObjectId, ref: 'Serie'},
    videogame     : { type: mongoose.Schema.Types.ObjectId, ref: 'Videogame'},
    name          : {  type: String, required : true},
    slug          : {  type: String, required : true}
}

MatchSchema.prototype.model = db.model(MatchSchema.prototype.name, new db.Schema(MatchSchema.prototype.schema));
export {
    MatchSchema
}
