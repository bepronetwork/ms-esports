import {globals} from "../../Globals";
let db = globals.main_db;

class BetResultSpaceSchema{};

BetResultSpaceSchema.prototype.name = 'BetResultSpace';

BetResultSpaceSchema.prototype.schema = {
    match       : { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    value       : { type: Number, required: true},
    market      : { type: Number, required: true },
    betType     : { type: Number, required: true },
    statistic   : { type: Number, required: true },
    finished    : { type: Boolean, required: true, default: false },
    status      : { type: String, required : true, default: "pending" }
};

// db o only allows once per type
BetResultSpaceSchema.prototype.model = db.model(BetResultSpaceSchema.prototype.name, new db.Schema(BetResultSpaceSchema.prototype.schema));

export {
    BetResultSpaceSchema
}
