const { expect } = require("chai");
const { async } = require("q");

describe("TicketToken", () => {
  describe("Deployment", () => {
    it("Sets the name", async () => {
        const TicketToken = await ethers.getContractFactory("TicketToken"); 
        TicketToken = await TicketToken.deploy("TicketToken", "TT");
        let name = await TicketToken.name();
        expect(name).to.equal("TicketMaster")

    });
  });
});
