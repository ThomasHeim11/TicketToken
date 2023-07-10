const { expect } = require("chai");

const NAME = "TicketToken";
const SYMBOL = "TT";

describe("TicketToken", () => {
  let TicketToken;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners()


    const TicketToken = await ethers.getContractFactory("TicketToken");
    ticketToken = await TicketToken.deploy(NAME, SYMBOL);
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await ticketToken.name()).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      expect(await ticketToken.symbol()).to.equal(SYMBOL);
    });
  });
});
