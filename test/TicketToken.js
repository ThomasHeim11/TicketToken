const { expect } = require("chai");


describe("TicketToken", () => {

  describe("Deployment", () => {
    it("Sets the name", async () => {
        const TicketToken = await ethers.getContractFactory("TicketToken"); 
        let ticketToken = await TicketToken.deploy("TicketToken", "TT");
        let name = await ticketToken.name();
        expect(name).to.equal("TicketToken")

    });
  });
});
