const sha256 = require("sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.transactions = [];
        this.hash = '';
        this.nonce = 0;
    }

    calculateHash() {
        return sha256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        );
    }

    // PROOF OF WORK
    mineBlock(difficulty) {
        const target = "0".repeat(difficulty);

        // Keep changing nonce until hash meets difficulty requirement
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1; // can be adjusted
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        const genesis = new Block(0, "17/12/25", "Genesis Block", "0");
        genesis.hash = genesis.calculateHash();
        return genesis;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    //  MINING LOGIC
    minePendingTransactions() {
        const block = new Block(
            this.chain.length,
            Date.now(),
            this.pendingTransactions
        );

        this.addBlock(block);

        // Clear pending transactions after mining
        this.pendingTransactions = [];

        // Return mined block for display
        return block;
    }
}

module.exports = { Blockchain, Block };
