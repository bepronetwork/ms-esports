import {globals} from "../../Globals";
let db = globals.main_db;

class BetResultSchema{};

BetResultSchema.prototype.name = 'BetResultSpace';

BetResultSchema.prototype.schema = {
    match       : { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    marketType  : { type: String, required: true },
    betType     : { type: Number, required: true },
    statistic   : { type: Number, required: true },
    finished    : { type: Boolean, required: true, default: false },
};

// db o only allows once per type
BetResultSchema.prototype.model = db.model(BetResultSchema.prototype.name, new db.Schema(BetResultSchema.prototype.schema));

export {
    BetResultSchema
}