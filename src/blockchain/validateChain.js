export function validateChain(chain) {
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    if (currentBlock.hash !== currentBlock.calculateHash()) {
      console.log("Invalid hash for block" + i);
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      console.log("Invalid previous hash for block" + i);
      return false;
    }
  }
  console.log("Valid block!");
  return true;
}
