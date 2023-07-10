const { expect } = require("chai");

describe("TicketToken", () => {
  beforeEach(async () => {
    const TicketToken = await ethers.getContractFactory("TicketToken");
    ticketToken = await TicketToken.deploy("TicketToken", "TT");
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await ticketToken.name()).to.equal("TicketToken");
    });

    it("Sets the symbol", async () => {
      expect(await ticketToken.symbol()).to.equal("TT");
    });
  });
});
