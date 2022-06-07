// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./FeedToken.sol";


//creating a contract for the game

contract DinoFeedBreed {

    mapping(address => uint256) balances; //mapping wallet address to balances.


    ERC20 public feedToken;
    address payable owner;
    
	//creating a constructor to initialize the feedToken and the owner of the contract plus supply.
    constructor() {
        feedToken = new FeedToken();
        owner = payable(msg.sender);
        balances[owner] = feedToken.totalSupply();
    }

	//modifiers below to check of owner, if not owner and for ratio of wei to tokens.
    modifier isOwner() {
        require(msg.sender == owner, "You are not the contract owner!");
        _;
    }

    modifier isNotOwner() {
        require(msg.sender != owner, "You cannot buy as the owner!");
        _;
    }

    modifier isRatio() {
        require(msg.value > 0, "The ratio between the tokens is 1:1, send more wei!");
        _;
    }

	//buy tokens with wei. Checks for ownership of contract.
    function buyTokens() payable isRatio public {
        require(msg.sender != owner, "You cannot buy as the owner!");
        require(balances[owner] > msg.value, "The token reserve has less than the amount you requested to buy!");

        uint256 amountToBuy = msg.value;
        
        address tokenBuyer = payable(msg.sender);
        
        //Sending money to the owner of contract
        owner.transfer(amountToBuy);

        //Send the token to the buyer
        feedToken.transfer(tokenBuyer, amountToBuy);

        //Updating values
        balances[owner] = balances[owner] - amountToBuy;
        balances[tokenBuyer] = amountToBuy;
    }
	
	//this function returns the balance of the wallet address that is input.
      function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }  


    uint256 dinoDnaDigits = 16;
    uint dnaModulus = 10 ** dinoDnaDigits;
    
    event NewDino(uint dinoId, string name, uint dna);
    
    struct Dino {
        string name;
        uint dna;
    }
    
    Dino[] public dinos;
    
    mapping (string => address) public dinoToOwner;
    mapping (address => uint) ownerDinoCount;
    
	//to store data, you can use either memory or storage to store the data. The difference
	//is that like below, the _name will be stored in the memory. This means that it will not 
	//be written on the blockchain so it will not cost money (ether).
	//On the other hand, when you use the keyword 'storage' instead of 'memory', you are storing
	//the data on the blockchain. Therefore, that becomes a payable transaction and you need to pay
	//for the storage.

    function _createDino(string memory _name, uint _dna) internal {
        dinos.push(Dino(_name, _dna));
        uint256 id = dinos.length;
        
        dinoToOwner[_name] = msg.sender;
        ownerDinoCount[msg.sender]++;
        
        emit NewDino(id, _name, _dna);
    }
    
	//Generating random DNA and storing in memory as _str and encoding it using keccak256.
    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }
    
	//Generating a random disnosaur, the owner cannot generate a dino and play the game.
    function createRandomDino(string memory _name) isNotOwner public {
        require(ownerDinoCount[msg.sender] == 0, "You already created your first random Dino. Feed your existing dino to multiply!");
        
        uint randDna = _generateRandomDna(_name);
        _createDino(_name, randDna);
    }


    uint256 public constant foodPrice = 1000 wei; // 1 food for 1000 wei
    uint256 public constant tokenPrice = 1000 wei; // 1 token for 1000 wei
    uint256 private totalCost; //cost of food in feed tokens
    uint256 public food = 0; 
    mapping(address => uint256) foodBalances;

	//Buying Dino food to feed and multiply. Checking to make sure it is not owner.
    function buyFoodWithTokens(uint _amount) isNotOwner external payable {
        
        address foodBuyer = payable(msg.sender);

        require(balances[foodBuyer] >= _amount, "You don't have enough tokens to buy food!");
        
        uint256 foodAmountToBuy = _amount;

        totalCost = foodPrice * foodAmountToBuy;
        //Sending money to the owner of contract
        feedToken.transfer(owner, totalCost);
        //owner.transfer(foodAmountToBuy);

        //Send the food to the buyer
        food = food+foodAmountToBuy;

        //Updating values
        balances[owner] = balances[owner] + foodAmountToBuy;
        balances[foodBuyer] = balances[foodBuyer] - foodAmountToBuy;
        foodBalances[foodBuyer] = food;
    }

	//Feeding a dinosaur by inputting its name such as the name given to the first random dino and checks
	//that you are not the owner.

    function feedAndMultiply(string memory DinoName, uint _targetDna) isNotOwner public {
      require(msg.sender == dinoToOwner[DinoName]);
      require(food >=1, "Not enough food!");
    
      // Dino storage myDinos = dinos[DinoName];
    
      _targetDna = _targetDna % dnaModulus;
    
      // uint newDna = (myDinos.dna + _targetDna) / 2;
    
      uint newDna = (42 + _targetDna) / 2;
    
      _createDino("Child Dino", newDna);
      food = food -1;

    }
}