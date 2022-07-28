// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    mapping(uint256 => uint256) aa; //slot0
    mapping(address => uint256) bb; //slot1
    //keccak256(key . slot)

    uint256[] public cc; // slot2
    //keccak256(slot) + index of item

    uint8 public a = 7; //1 byte
    uint16 public b = 10; //2 bytes
    address public c = 0x7C98675d67Bbd233619226A55C64B6A6eC934793; //20 bytes
    bool d = true; //1 byte
    uint64 public e = 15; //8 bytes

    //32 bytes in 1 slot (slot 3 for the above ones)

    uint256 public f = 200; //32 bytes => slot 4
    uint8 public g = 40; //1 byte => slot 5
    uint256 public h = 789; //32 bytes => slot 6

    constructor() {
        cc.push(1);
        cc.push(10);
        cc.push(100);

        aa[2] = 4;
        aa[3] = 10;
        bb[0x7C98675d67Bbd233619226A55C64B6A6eC934793] = 100;
    } //runs when contract is deployed
}
