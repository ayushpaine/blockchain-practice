// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    //special function called when you make a transaction that doesnt specify function name to call
    //ext func part of contract interface which means they can be called  via contracts and other transactions
    receive() external payable {}
    //nonce - a hash that proves that the blockhas gone through pow
    //8 bytes
}
