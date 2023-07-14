// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title TicketToken
 * @author Thomas Heim
 * @dev A contract for managing ticket tokens using ERC721 standard.
 */
contract TicketToken is ERC721 {
    address public owner;
    uint256 public totalOccasions;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;

    /**
     * @dev Modifier to check if the function caller is the owner of the contract.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    /**
     * @dev Contract constructor.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     */
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    /**
     * @dev Lists a new occasion with the specified details.
     * @param _name The name of the occasion.
     * @param _cost The cost of each ticket for the occasion.
     * @param _maxTickets The maximum number of tickets available for the occasion.
     * @param _date The date of the occasion.
     * @param _time The time of the occasion.
     * @param _location The location of the occasion.
     */
    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    /**
     * @dev Mints a ticket token for the specified occasion and seat.
     * @param _id The ID of the occasion for which to mint the ticket.
     * @param _seat The seat number for the ticket.
     */
    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id != 0, "Invalid occasion ID");
        require(_id <= totalOccasions, "Occasion ID does not exist");

        require(msg.value >= occasions[_id].cost, "Insufficient payment");

        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Invalid seat number");

        occasions[_id].tickets--;

        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;

        seatsTaken[_id].push(_seat);

        totalSupply++;

        _safeMint(msg.sender, totalSupply);
    }

    /**
     * @dev Retrieves the details of an occasion.
     * @param _id The ID of the occasion.
     * @return The Occasion struct containing the occasion's details.
     */
    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    /**
     * @dev Retrieves the list of seats taken for a specific occasion.
     * @param _id The ID of the occasion.
     * @return An array of seat numbers that are already taken.
     */
    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    /**
     * @dev Allows the owner to withdraw the contract's balance.
     */
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
