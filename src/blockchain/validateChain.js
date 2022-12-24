export function validateChain(chain) {


  for (let i = 1; i < chain.blockChain.length; i++) {
  const currentBlock = chain.blockChain[i];
  const previousBlock = chain.blockChain[i - 1];

  if (currentBlock.hash !== currentBlock.calculateHash()) {
    console.log(`Invalid hash for block ${i + 1}`);
    return false;
  }
  
  if (currentBlock.previousHash !== previousBlock.hash) {
    console.log(`Invalid previous hash for block ${i + 1}`);
    return false;
  }
  }
  console.log("Chain is valid");
  return true;
}

