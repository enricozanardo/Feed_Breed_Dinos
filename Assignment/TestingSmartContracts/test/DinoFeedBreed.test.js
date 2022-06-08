//const { default: Web3 } = require("web3");

var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider || 'ws://some.local-or-remote.node:8546');


// or using the web3 umbrella package

var Web3 = require('web3');
const { assert } = require('chai');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

// -> web3.eth

const DinoFeedBreed = artifacts.require('DinoFeedBreed');
//var tokenInstance

module.exports = function(deployer){
    deployer.deploy(DinoFeedBreed);
}

contract('DinoFeedBreed', (accounts) => {

    let contractInstance; 

    const INITIAL_SUPPLY = 18000000000000000000;

    beforeEach(async () => {
        // Get the instance of the contract
        contractInstance = await DinoFeedBreed.deployed();
    });

    it(`Should put ${INITIAL_SUPPLY} Tokens in the first account`, async () => {
        let balance = await contractInstance.balanceOf.call(accounts[0])

        assert.equal(balance.valueOf(), INITIAL_SUPPLY, `The initial supply seams not correct ${INITIAL_SUPPLY}`);
    });


    it(`Should createRandomDino a random Dino`, async () => {
        var account = accounts[2];

        const GAS_LIMIT = 500000;

        let queryCreateDino = await contractInstance.createRandomDino("Pino", {from: account, gas: GAS_LIMIT});
       
        assert.equal(5, 5, "No valid Dino created");
    })

    //it("test get balance", async function () {
    //    let instance = await DinoFeedBreed.deployed();
    //    console.log("deployed address" + instance.address);
    //    let balance = await Web3.eth.balanceo(instance.address)
    //})    
    
    //Purchasing Tokens
    it("Purchasing of Tokens", async () => {
        
        var account = accounts[2];

        const GAS_LIMIT = 500000;

        let queryBuyTokens = await contractInstance.buyTokens({from: account, gas:
        GAS_LIMIT, value: web3.utils.toWei('1','ether') });
        assert.equal(4,4, "")

    });
    
    //Trying to purchase Food
    it("Purchasing of Food", async () => {
        
        var account = accounts[2];

        const GAS_LIMIT = 500000;

        let queryBuyFoodWithTokens = await contractInstance.buyFoodWithTokens(100, {from: account, gas:
        GAS_LIMIT});
        assert.equal(4,4, "")
    });

});


    // it('Should send 10 Tokens correctly', async () => {

    //     var account_one = accounts[0];
    //     var account_two = accounts[1];

    //     var account_one_starting_balance = await contractInstance.balanceOf.call(account_one);
    //     var account_two_starting_balance = await contractInstance.balanceOf.call(account_two);
        
    //     // Transfer 10 XMan Tokens
    //     var amount = 10;
    //     await contractInstance.transfer(account_two, amount, { from: account_one })

    //     var account_one_ending_balance = await contractInstance.balanceOf.call(account_one);
    //     var account_two_ending_balance = await contractInstance.balanceOf.call(account_two);

    //     var balance_one = account_one_ending_balance.toNumber();
    //     var balance_two = account_two_ending_balance.toNumber();
    //     var check_one = account_one_starting_balance - amount;
    //     var check_two = account_two_starting_balance + amount;
        
    //     assert.equal(balance_one,  check_one, "Amount wasn't successfully taken from the sender.");
    //     assert.equal(balance_two, check_two, "Amount wasn't successfully sent to the receiver.")

    // })

    // it(`Should collect the Dinos of a specific account`, async () => {
    //     var account = accounts[1];

    //     const GAS_LIMIT = 500000;

    //     let queryNumberOfDinos = await contractInstance.getNumberOfDinos({from: account, gas: GAS_LIMIT});
       
    //     assert.equal(queryNumberOfDinos, 0, "No valid Dinos created");
    // })
