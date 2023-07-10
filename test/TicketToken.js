const { expect } = require("chai");

describe("TicketToken", () => {
  beforeEach(async () => {
    const TicketToken = await ethers.getContractFactory("TicketToken");
    ticketToken = await TicketToken.deploy("TicketToken", "TT");
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      let name = await ticketToken.name();
      expect(name).to.equal("TicketToken");
    });

    it("Sets the symbol", async () => {
      let symbol = await ticketToken.symbol();
      expect(symbol).to.equal("TT");
    });
  });
});
