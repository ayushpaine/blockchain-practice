// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Logger {
    uint256 public testNum;

    constructor() {
        testNum = 1000;
    }

    function emitLog() public pure virtual returns (bytes32);

    function test3() internal pure returns (uint256) {
        return 100;
    }
}
//its a way for designer to say "any child of this abstracr contract has to implement these methods"
