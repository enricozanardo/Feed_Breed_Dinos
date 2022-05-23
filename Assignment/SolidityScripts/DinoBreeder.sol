// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

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