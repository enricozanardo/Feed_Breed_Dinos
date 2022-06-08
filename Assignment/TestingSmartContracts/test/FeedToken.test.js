const BigNumber = web3.BigNumber;

const FeedToken = artifacts.require("FeedToken");

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .use(require('chai-as-promised'))
    .should();

contract("FeedToken", accounts => {
    const _name = 'FeedToken';
    const _symbol = 'FBD';
    const _decimals = 18;

    beforeEach(async function() {
        this.token = await FeedToken.new();
    });


    describe("token attributes", function() {
        it("has the correct name", async function() {
            const name = await this.token.name();
            name.should.equal(_name);
        });

        it("has the correct symbol", async function(){
            const symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });

        it("has the correct decimals", async function(){
            const decimals = await this.token.decimals();
            decimals.should.equal
        });
    })
})