//=====================================//
//================IMPORTS==============//
//=====================================//

import { default as Block } from "/src/blockchain/block.js";
import { rollApi } from "/src/api/locationScript.js";
import { default as Chain } from "/src/blockchain/chain.js";
import { calculateHash } from "/src/blockchain/calculateHash.js";
import { createLoginField } from "/src/logInAndOut.js";
import { validateChainBtn } from "/src/logInAndOut.js";
import { validateChain } from "/src/blockchain/validateChain.js";
import { loginFormButton } from "/src/logInAndOut.js";

//=====================================//
//===========GLOBAL VARIABLES==========//
//=====================================//

let searchButton = document.getElementsByClassName("searchButton")[0];
let input = document.getElementsByClassName("searchInput")[0];

//=====================================//
//=============RUNNING SCRIPT==========//
//=====================================//

rollApi(searchButton, input);
// console.log("Encrypt: Hello World! ===", await calculateHash("Hello World!"));

createLoginField();
validateChainBtn();

let first = new Chain();
first.addBlock("första blocket");
first.addBlock("andra blocket");
first.addBlock("tredje blocket");
console.log(Chain);
console.log(Block);
console.log(first);

// createLoginField();
loginFormButton();


console.log(validateChain(Chain));
