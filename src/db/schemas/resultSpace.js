import {globals} from "../../Globals";
let db = globals.main_db;

class ResultSpaceSchema{};

ResultSpaceSchema.prototype.name = 'ResultSpace';

ResultSpaceSchema.prototype.schema = {
    formType                    : {type: String, required : true},  
    probability                 : {type: Number, required : true},
    multiplier                  : {type: Number, required : false},
    metadataJSON                : {type : JSON, required : false}    
}


ResultSpaceSchema.prototype.model = db.model(ResultSpaceSchema.prototype.name, new db.Schema(ResultSpaceSchema.prototype.schema));
        
export {
    ResultSpaceSchema
}
