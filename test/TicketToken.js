const { expect } = require("chai");
const { async } = require("q");

const NAME = "TicketToken";
const SYMBOL = "TT";

const OCCASION_NAME = "ETH Texas";
const OCCASION_COST = ethers.utils.parseUnits("1", "ether");
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "Apr 27";
const OCCASION_TIME = "10:00AM CST";
const OCCASION_LOCATION = "Austin, Texas";

describe("TicketToken", () => {
  let TicketToken;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    const TicketToken = await ethers.getContractFactory("TicketToken");
    ticketToken = await TicketToken.deploy(NAME, SYMBOL);

    const transaction = await ticketToken.connect(deployer).list(
        OCCASION_NAME,
        OCCASION_COST,
        OCCASION_MAX_TICKETS,
        OCCASION_DATE,
        OCCASION_TIME,
        OCCASION_LOCATION
    );

    await transaction.wait();
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await ticketToken.name()).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      expect(await ticketToken.symbol()).to.equal(SYMBOL);
    });

    it("Sets the owner", async () => {
      expect(await ticketToken.owner()).to.equal(deployer.address);
    });

    describe("Occasions", () => {
      it("Updates occasions count", async () => {
        const totalOccasions = await ticketToken.totalOccasions();
        expect(totalOccasions).to.equal(1);
      });
    });
  });
});
