// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./FeedToken.sol";

contract DEX {

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

}

contract DinoBreeder {
    
    uint256 dinoDnaDigits = 16;
    uint dnaModulus = 10 ** dinoDnaDigits;
    
    event NewDino(uint dinoId, string name, uint dna);
    
    struct Dino {
        string name;
        uint dna;
    }
    
    Dino[] public dinos;
    
    mapping (uint => address) public dinoToOwner;
    mapping (address => uint) ownerDinoCount;
    
    function _createDino(string memory _name, uint _dna) internal {
        dinos.push(Dino(_name, _dna));
        uint256 id = dinos.length;
        
        dinoToOwner[id] = msg.sender;
        ownerDinoCount[msg.sender]++;
        
        emit NewDino(id, _name, _dna);
    }
    
    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }
    
    function createRandomDino(string memory _name) public {
        require(ownerDinoCount[msg.sender] == 0);
        
        uint randDna = _generateRandomDna(_name);
        _createDino(_name, randDna);
    }

    
}

contract DinoFeeder is DinoBreeder, DEX {

    uint256 public constant foodPrice = 1 wei; // 1 food for 1 wei
    uint256 public constant tokenPrice = 1 wei; // 1 token for 1 wei
    uint256 public food = 0; 
    mapping(address => uint256) foodBalances;


    function buyFoodWithTokens(uint _amount) external payable {
        
        address foodBuyer = payable(msg.sender);

        require(balances[foodBuyer] >= _amount, "You don't have enough tokens to buy food!");
        require(msg.sender != owner, "You cannot buy as the owner!");
        uint256 foodAmountToBuy = _amount;

        
        //Sending money to the owner of contract
        owner.transfer(foodAmountToBuy);

        //Send the food to the buyer
        food = food+foodAmountToBuy;

        //Updating values
        balances[owner] = balances[owner] + foodAmountToBuy;
        balances[foodBuyer] = balances[foodBuyer] - foodAmountToBuy;
        foodBalances[foodBuyer] = food;
    }


    function feedAndMultiply(uint _dinoId, uint _targetDna) public {
      require(msg.sender == dinoToOwner[_dinoId]);
      require(food >=1, "Not enough food!");
    
      // Dino storage myDinos = dinos[_dinoId];
    
      _targetDna = _targetDna % dnaModulus;
    
      // uint newDna = (myDinos.dna + _targetDna) / 2;
    
      uint newDna = (42 + _targetDna) / 2;
    
      _createDino("Child Dino", newDna);
      food = food -1;
  }

    
 //HOW TO USE
 // 1) createRandomDino and input a name eg. FirstDino
 // 2) To use 'dinos' function, think in index. FirstDino = index 0.
 // 3) To feed the FirstDino, input dinoId WHICH IS 1 (not 0, not index.) and then, FirstDino's DNA(or any DNA? test further).   
 // 4) To use DinoToOwner function, again, think in ID (1 for FirstDino and 2 for ChildDino (if fed) not in index!).
}