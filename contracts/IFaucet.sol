// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface IFaucet {
    function addFunds() external payable;

    function withdraw(uint256 withdrawAmount) external;
}
//similar to abstract classes but restrictions, they cant inherit from other smart contracts only from other interfaces
//they cannot declare a constructor, state variables
//all declared functions have to be external
