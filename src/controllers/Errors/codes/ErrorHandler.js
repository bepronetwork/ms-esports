

var ErrorHandler = function(){}


ErrorHandler.prototype.errors = require('./codes.json');

/***************************
 * 
 *  @param { DEFINE KEYS }
 *        
 *         ALL KEYS
 * 
 ****************************/

ErrorHandler.prototype.KEYS =  {
    'UNKNOWN'                               : "000",
    'MATCH_NOT_EXISTENT'                    : "001",
    'GAME_NOT_EXISTENT'                     : "002",
    'SERIE_NOT_EXISTENT'                    : "003",
    'WRONG_PARAMS'                          : "004",
    'USER_NOT_EXISTENT'                     : "005",
    'APP_NOT_EXISTENT'                      : "006",
    'ADMIN_NOT_EXISTENT'                    : "007",
    'WALLET_NOT_EXISTENT'                   : "008",
    'INSUFFICIENT_FUNDS'                    : "009",
    'WRONG_PROBABILITY'                     : "010",
    'NOT_PROBABILITY'                       : "011",
    'AUTH_USER'                             : "012",
    'MATCH_FINISHED'                        : "013"
};

/***************************
 *
 *
 *         GET METHODS
 *
 *
 ****************************/
ErrorHandler.prototype.getMessage = function(code){
    return this.errors[code].message;
}

ErrorHandler.prototype.getKey = function(code){
    return this.errors[code].key;
}

ErrorHandler.prototype.getError = function(code){
    console.log("code", code);
    return {
        key     : this.getKey(code),
        code    : parseInt(code),
        message : this.getMessage(code)
    }
}


ErrorHandler.prototype.getCode = (code) => {
    let codes = Object.keys(this.errors);
    return codes.find( c => c.equals(code));
}


module.exports = ErrorHandler;
