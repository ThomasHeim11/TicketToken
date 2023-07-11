const { expect } = require("chai");

const NAME = "TicketToken";
const SYMBOL = "TT";

const OCCASION_NAME = "ETH Texas";
const OCCASION_COST = ethers.utils.parseUnits("1", "ether");
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "Apr 27";
const OCCASION_TIME = "10:00AM CST";
const OCCASION_LOCATION = "Austin, Texas";

describe("TicketToken", () => {
  let ticketToken;
  let deployer, buyer;

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners();

    const TicketToken = await ethers.getContractFactory("TicketToken");
    ticketToken = await TicketToken.deploy(NAME, SYMBOL);

    const transaction = await ticketToken
      .connect(deployer)
      .list(
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

    describe("Occasion", () => {
      it("Updates ocassions count", async () => {
        const totalOccasions = await ticketToken.totalOccasions();
        expect(totalOccasions).to.equal(1);
      });
      it("Returns occasions attributes", async () => {
        const occasion = await tokenMaster.getOccasion(1);
        expect(occasion.id).to.be.equal(1);
        expect(occasion.name).to.be.equal(OCCASION_NAME);
        expect(occasion.cost).to.be.equal(OCCASION_COST);
        expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS);
        expect(occasion.date).to.be.equal(OCCASION_DATE);
        expect(occasion.time).to.be.equal(OCCASION_TIME);
        expect(occasion.location).to.be.equal(OCCASION_LOCATION);
      });
    });
  });
});
