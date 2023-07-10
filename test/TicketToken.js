const { expect } = require("chai");
const { async } = require("q");

const NAME = "TicketToken";
const SYMBOL = "TT";

describe("TicketToken", () => {
  let TicketToken;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners()


    const TicketToken = await ethers.getContractFactory("TicketToken");
    ticketToken = await TicketToken.deploy(NAME, SYMBOL);

    await ticketToken.connect(deployer).list()
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

        it('Updates occasions count', async () => {
            const totalOccasions = await ticketToken.totalOccasions();
            expect(totalOccasions).to.equal(1);

        })
    })
  });
});
