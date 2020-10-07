import EtherscanSingleton from "../etherscan/etherscan";
import Numbers from "./numbers";
import { globalsTest } from "../../GlobalsTest";

let services = {
    application : {
        101 : {
            name : 'casino',
            widgets : [201]
        }
    },
    widgets : {
        201 : {name : 'crypto'}
    }
}



let getServices = (servicesArray) => {
    let returnServices = [];
    for(var i = 0; i < servicesArray.length; i++){
        let service = parseInt(servicesArray[i]);
        let applications = Object.keys(services.application).map( (key, index) => {
            if(parseInt(key) == service){
                return service;
            }
        })
        let widgets = Object.keys(services.widgets).map( (key, index) => {
            if(parseInt(key) == service){
                return service;
            }
        })

        returnServices = returnServices.concat(applications).concat(widgets).filter((el) => el != null );
    }
    return returnServices;
}


function fromBigNumberToInteger(value, decimals=18){
    return value/ Math.pow(10, decimals)*1000000000000000000;
}

function fromDecimals(value, decimals){
    return value/10**decimals
}

function fromExponential(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }


async function verifytransactionHashDepositUser(blockchain, transactionHash, amount, platformAddress, decimals){
    try{

        /* Get Information of this transactionHash */
        let res_transaction = await globalsTest.web3.eth.getTransaction(transactionHash);
        let res_transaction_recipt = await globalsTest.web3.eth.getTransactionReceipt(transactionHash);
        let res_transaction_decoded = EtherscanSingleton.getTransactionDataCasino(res_transaction, res_transaction_recipt);
        
        /* Verify if receiver of Transaction is platformAddress */
        if(new String(res_transaction_decoded.tokensTransferedTo).toLowerCase() != new String(platformAddress).toLowerCase()){
            throw false;
        }

        /* Verify if the Token Amount is the same */
        if(
            Numbers.fromExponential(new Number(res_transaction_decoded.tokenAmount)) 
            != Numbers.toSmartContractDecimals(new Number(amount), decimals)){
            throw false;
        }

        /* Verify if Transaction was Succeded */
        // TO DO 

        return {
            isValid : true,
            from :  res_transaction.from 
        };

    }catch(err){
        console.log(err);
        return {
            isValid : false
        };
    }
};



async function verifytransactionHashDirectDeposit(blockchain, transactionHash, amount, platformAddress, decimals){
    try{
        /* Get Information of this transactionHash */
        let res_transaction = await globalsTest.web3.eth.getTransaction(transactionHash);
        let res_transaction_decoded = EtherscanSingleton.getTransactionDataERC20(res_transaction);
        /* Verify if receiver of Transaction is platformAddress */
        if(new String(res_transaction_decoded.tokensTransferedTo).toLowerCase() != new String(platformAddress).toLowerCase()){
            throw false;
        }
        /* Verify if the Token Amount is the same */
        if(
            Numbers.fromExponential(new Number(res_transaction_decoded.tokenAmount)) 
            != Numbers.toSmartContractDecimals(new Number(amount), decimals)){
            throw false;
        }

        /* Verify if Transaction was Succeded */
        // TO DO 

        return {
            isValid : true,
            from :  res_transaction.from 
        };

    }catch(err){
        return {
            isValid : false
        };
    }
}

export {
    services,
    verifytransactionHashDepositUser,
    getServices,
    verifytransactionHashDirectDeposit,
    fromDecimals,
    fromExponential,
    fromBigNumberToInteger
}