// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CreateArmour {
    constructor() {}

    event WorkCreated(    
        uint128 timeStamp,
        string cid
    );

    struct Work {
        string cid;
        uint timeStamp;
    }

    mapping(address => Work[]) public works;

    function createCampaign(string calldata _cid) external {

        Work memory work = Work({
            timeStamp: uint128(block.timestamp),
            cid: _cid
        });

        works[msg.sender].push(work);
    }
}
