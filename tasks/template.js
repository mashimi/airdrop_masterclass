const { ethers } = require("hardhat");

const tokenBuyTask = task("buy-token", "Buy tokens when listed")
  .addParam("token", "The token contract address")
  .addParam("amount", "The amount of tokens to buy")
  .setAction(async ({token, amount}, {ethers}) => {

    const tokenContract = await ethers.getContractAt("Token", token);

    // Wait for the token to be listed
    await tokenContract.on("Listing", async() => {

      console.log(`${token} is now listed! Buying...`);
      
      const buyTx = await tokenContract.buy(amount, {value: ethers.utils.parseEther(amount)});
      await buyTx.wait();

      console.log(`Bought ${amount} ${await tokenContract.symbol()}`);

    });

  });

module.exports = {
  tokenBuyTask  
}
const { ethers } = require("ethers"); 

// URL of Ethereum node
const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/your-api-key");

// Wallet private key 
const privateKey = "your-wallet-private-key";

// Connect wallet to provider
const wallet = new ethers.Wallet(privateKey, provider);

// Contract address and ABI of token to snipe 
const tokenAddress = "0x..."; 
const tokenABI = [...] 

// Create contract instance
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

// Function to buy tokens 
const buyTokens = async () => {
  const tx = await tokenContract.buy({value: ethers.utils.parseEther("0.1")});
  await tx.wait();
  console.log("Bought tokens!");
}

// Check for new blocks 
provider.on("block", async (blockNumber) => {
  // Check if token sale is active
  if (isSaleActive()) {
    // Buy tokens
    await buyTokens(); 
  }
});

function isSaleActive() {
  // Logic to check if sale has started
  ...
}
require("hardhat/config")

/**
 * This is an example template task
 * script.
 */

// Artifact imports here.
// ex. const IERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

const templateDefinition = task("template", "Description of Task")
  .addParam("account", "Account to perform the transfer")
  .setAction(async (taskArgs, hre) => {
    const [ACCOUNT_1, ACCOUNT_2] = await hre.ethers.getSigners()

    // Figure out account to use
    const account = taskArgs.account === ACCOUNT_1.address ? ACCOUNT_1 : ACCOUNT_2

    // Perform task

    /**
     * Here you can code out the main
     * logic of your task. 
     * 
     * You can look at the swap & transfer
     * task for a more detailed example.
     */

    console.log(`Perform task for ${account.address}`)

  })

/**
 * Create any utility or helper functions below.
 * Some examples could be like reading an account's
 * balance. Reference the swap & transfer script
 * for more examples.
 */

async function templateFunction() {
  console.log("do something in here?")
}

/**
 * Export the task
 */

module.exports = {
  templateDefinition
}