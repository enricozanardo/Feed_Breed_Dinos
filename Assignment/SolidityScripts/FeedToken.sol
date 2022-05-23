// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FeedToken is ERC20{
    uint256 initialSupply = 18 ether;
   constructor() ERC20("FeedToken","FBD") {
       _mint(msg.sender, initialSupply);
    }


}