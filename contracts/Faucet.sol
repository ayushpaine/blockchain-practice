// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {
    //special function called when you make a transaction that doesnt specify function name to call
    //ext func part of contract interface which means they can be called  via contracts and other transactions
    receive() external payable {}

    function emitLog() public pure override returns (bytes32) {
        return "Hello World";
    }

    //nonce - a hahttps://github.com/Jerga99/faucet-coursesh that proves that the blockhas gone through pow
    //8 bytes
    uint256 public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint256 => address) private lutFunders;

    modifier limitWithdraw(uint256 withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Exceeded withdrawal limit"
        );
        _;
    }

    //private accessible onlu within smart contract
    //internal can be accessible within smart contract and also derived smart contract

    function addFunds() external payable override {
        address funder = msg.sender;

        test3();

        if (!funders[funder]) {
            funders[funder] = true;
            lutFunders[numOfFunders++] = funder;
        }
    }

    function testing() external pure returns (uint256) {
        return 2 + 2;
    }

    //view indicates that the fn will not alter the storage state in any way
    //pure indicates that the fn will not even real the storage state - stricter
    //pure, view - read only (no gas fee)
    //transactions - gas fee
    //to talk to node on netweork u can make json-rpc calls

    function test1() external onlyOwner {
        //only admin should have access to
    }

    function test2() external onlyOwner {
        //only admin should have access to
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    function withdraw(uint256 withrawAmount)
        external
        override
        limitWithdraw(withrawAmount)
    {
        payable(msg.sender).transfer(withrawAmount);
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }
}
