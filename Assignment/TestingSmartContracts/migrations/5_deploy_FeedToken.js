var FeedToken = artifacts.require("./FeedToken.sol");

module.exports = function(deployer) {
  deployer.deploy(FeedToken);
};