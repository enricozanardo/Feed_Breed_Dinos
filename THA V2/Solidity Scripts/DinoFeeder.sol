// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./DinoBreeder.sol";
import "./DinoToken.sol";

contract DinoFeeder is DinoBreeder, DinoToken, DEX {

    uint256 public constant foodPrice = 1000; // 1 food for 1000 wei
    uint256 public constant tokenPrice = 1000; // 1 token for 1000 wei
    uint256 public food = 0; // 1 food for 1000 wei



    function buyFood(uint256 _amount) external payable {
      // e.g. the buyer wants 100 tokens, needs to send 500 wei
      require(msg.value == _amount * foodPrice, 'One Food Costs One Thousand Wei! - Send appropriate amount.');
      food = food+_amount;
      /*
      * sends the requested amount of tokens
      * from this contract address
      * to the buyer
      */
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