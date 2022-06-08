var DinoFeedBreed = artifacts.require("./DinoFeedBreed.sol");

module.exports = function(deployer) {
  deployer.deploy(DinoFeedBreed);
};