// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Attacker is Player {
    uint256 counter = 0;
    MagicSequence target;

constructor(address _target) public {
    target = MagicSequence(_target);
}

function number() external overrife returns (uint256) {
    uint256 output;

    if (counter == 0) output = 42;
    if (counter == 1) output = 55;
    if (counter == 2) output = 256;
    if (counter == 3) output = 9876543;

    counter++:

    return output;
}

function attack() external {
    target.start();
}

}