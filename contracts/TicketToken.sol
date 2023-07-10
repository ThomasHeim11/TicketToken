// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketToken is ERC721 {
    address public owner;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
}
