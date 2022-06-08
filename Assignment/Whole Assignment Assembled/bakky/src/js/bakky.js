var web3Provider = null;
var contracts = {};
var FOOD = 12;
const GANACHE_URL = 'http://127.0.0.1:8545';
const CONTRACT_FILE_NAME = 'DinoFeedBreed.json';
const GAS_LIMIT = 500000;

const initWeb3 = async () => {
    await window.ethereum.enable();

    if(typeof web3 !== 'undefined') {
        // Initialize web3 and set the provider to the testRPC.
        web3Provider = await web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3Provider = new Web3.providers.HttpProvider(GANACHE_URL);
        web3 = new Web3(web3Provider);
    }

    return [web3, web3Provider];
}

const initContract = async () => {
    // console.log('Init the contract')

    //Get the necessary contract artifact file and instantiate it with truffle-contract.
    var json_contract = await $.getJSON(CONTRACT_FILE_NAME);

    contracts.DinoFeedBreed = TruffleContract(json_contract);
    //  Set the provider for our contract.
    await contracts.DinoFeedBreed.setProvider(web3Provider);
}

const getAccount = () => {
    return new Promise(async (accept, reject)=> {
        try {
            web3.eth.getAccounts( (error, accounts) => {
                // In the frontend application we could retrieve just the account that is connected;
                accept(accounts[0]);

                if (accounts.length == 0) {
                    reject(`It was not possible to get accounts`);
                }
            } );
        } catch (err) {
            console.log(`It was not possible to get accounts ${err}`);
        }
    })
}


const getBalance = async (account) => {
    // console.log('Get balances');
    let balance = 0;

    var contractInstance = await contracts.DinoFeedBreed.deployed();
    const raw = await contractInstance.balanceOf.call(account);

    balance = raw.c[0];

    // Update the value on frontend
    $('#FBDBalance').text(balance);
}

const handleBuyTokenDino = async (event) => {
    try {
    var contractInstance = await contracts.DinoFeedBreed.deployed();
    event.preventDefault();

    const raw = await contractInstance.buyFoodWithTokens.call();
    
    console.log(raw);

    balance = raw.c[0];

    // Update the value on frontend
    $('#FBDBalance').text(balance);
    } catch (err) {
        alert('You cannot buy as the owner!');
    }
}

const handleBuyFoodDino = async (event) => {
    try {
    var contractInstance = await contracts.DinoFeedBreed.deployed();
    event.preventDefault();

    var amount = $('#foodAmount').val();

    const raw = await contractInstance.buyFoodWithTokens.call(amount);
    
    console.log(raw);

    balance = raw.c[0];
    foodBalance = raw.c[0];

    // Update the value on frontend
    $('#FBDBalance').text(balance);
    $('#FoodBalance').text(FOOD);
    } catch (err) {
        alert('You cannot buy as the owner!');
    }
}

const handleCreateDino = async (event) => {
    event.preventDefault();

    var dinoName = $('#DinoName').val();
    
    // Validate inputs
    if (dinoName == "") {
        alert('Name must be provided.')
        return;
    }

    return new Promise( async (accept, reject) => {
        try {
            var contractInstance = await contracts.DinoFeedBreed.deployed();

            console.log(contractInstance);

            var account = await getAccount();

            const result = await contractInstance.createRandomDino(_name, {from: account, gas: GAS_LIMIT} );

            console.log(result)

            if (result.receipt.status == "0x1") {
                alert('Dino successfully created!');
                getBalance(account);
            }
            
            refresh();
            accept();

        } catch (err) {
            alert('You already created your first random Dino!');
        }
    });   
}

const handleFeedAndMultiplyDino = async (event) => {
    try {
    var contractInstance = await contracts.DinoFeedBreed.deployed();
    event.preventDefault();

    var dinoName = $('#DinoName').val();

    // Validate inputs
    if (dinoName == "") {
        alert('Name must be provided.')
        return;
    }

    const result = await contractInstance.feedAndMultiply(_name, dna);
    
    console.log(result);

    foodBalance = result.c[0];

    // Update the value on frontend
    $('#FoodBalance').text(FOOD);
    } catch (err) {
        alert('You cannot feed as the owner!');
    }
}

const refresh = async () => {

    document.getElementById('DinoName').value = '';  
}

/*
Javascript functions are not fully implemented and most do not work as intended due to isNotOwner constraint from DinoFeedBreed.sol
This is because the ability to change between wallet addresses was not implemented and therefore, on the front-end side it's always
the owner that is interacting. Hence, the limited features. 
*/

window.onload = choosePic;

var myPix = new Array("img/dino0.png","img/dino1.png","img/dino2.png","img/dino3.png");

function choosePic() {
     var randomNum = Math.floor(Math.random() * myPix.length);
     document.getElementById("Dino").src = myPix[randomNum];
}


// Events
const bindEvents = () => {

    $(document).on('click', '#createDinoButton', handleCreateDino);

    $(document).on('click', '#buyFoodDinoButton', handleBuyFoodDino);

    $(document).on('click', '#buyTokenDinoButton', handleBuyTokenDino);

    $(document).on('click', '#createFeedBreedDinoButton', handleFeedAndMultiplyDino);

}


const Bakky = async () => {
    console.log('Starting Bakky...')
   
    await initWeb3();

    await initContract();
    
    var account = await getAccount();

    await getBalance(account);

    bindEvents();
    
    updateDashboard();
}


// Load the function at the beginning
$(window).load(function() {
    Bakky();
});








