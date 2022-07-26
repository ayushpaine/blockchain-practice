// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    //special function called when you make a transaction that doesnt specify function name to call
    //ext func part of contract interface which means they can be called  via contracts and other transactions
    receive() external payable {}

    //nonce - a hash that proves that the blockhas gone through pow
    //8 bytes
    address[] public funders;

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function testing() external pure returns (uint256) {
        return 2 + 2;
    }

    //view indicates that the fn will not alter the storage state in any way
    //pure indicates that the fn will not even real the storage state - stricter
    //pure, view - read only (no gas fee)
    //transactions - gas fee
    //to talk to node on netweork u can make json-rpc calls
    function getAllFunders() public view returns (address[] memory) {
        return funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        address[] memory _funders = getAllFunders();
        return _funders[index];
    }
}
