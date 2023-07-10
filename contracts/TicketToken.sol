// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketToken is ERC721 {
    address public owner;
    uint256 public totalOccasions;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) occasions;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public {
        
        require(msg.sender == owner);

        totalOccasions++;

        occasions[totalOccasions] = Occasion(totalOccasions, _name, _cost, _maxTickets, _date, _time, _location);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }
}
