// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./FeedToken.sol";

contract DinoFeedBreed {

    mapping(address => uint256) balances;


    ERC20 public feedToken;
    address payable owner;
    
    constructor() {
        feedToken = new FeedToken();
        owner = payable(msg.sender);
        balances[owner] = feedToken.totalSupply();
    }


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
    
    function _createDino(string memory _name, uint _dna) internal {
        dinos.push(Dino(_name, _dna));
        uint256 id = dinos.length;
        
        dinoToOwner[_name] = msg.sender;
        ownerDinoCount[msg.sender]++;
        
        emit NewDino(id, _name, _dna);
    }
    
    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }
    
    function createRandomDino(string memory _name) isNotOwner public {
        require(ownerDinoCount[msg.sender] == 0, "You already created your first random Dino. Feed your existing dino to multiply!");
        
        uint randDna = _generateRandomDna(_name);
        _createDino(_name, randDna);
    }


    uint256 public constant foodPrice = 1; // 1 food for 1 wei
    uint256 public constant tokenPrice = 1 wei; // 1 token for 1 wei
    uint256 private totalCost; //cost of food in feed tokens
    uint256 public food = 0; 
    mapping(address => uint256) foodBalances;


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