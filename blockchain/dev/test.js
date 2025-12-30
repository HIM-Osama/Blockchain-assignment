const { Blockchain, Block } = require("./blockchain");

const testCoin = new Blockchain();

testCoin.pendingTransactions.push({ amount: 4 });
testCoin.minePendingTransactions();

testCoin.pendingTransactions.push({ amount: 4 });
testCoin.minePendingTransactions();

// Print the blockchain
console.log(JSON.stringify(testCoin, null, 4));
