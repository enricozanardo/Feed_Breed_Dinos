App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('FeedToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var FeedTokenArtifact = data;
      App.contracts.FeedToken = TruffleContract(FeedTokenArtifact);

      // Set the provider for our contract.
      App.contracts.FeedToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  getBalances: function() {
    console.log('Getting balances...');

    var FeedTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.FeedToken.deployed().then(function(instance) {
        FeedTokenInstance = instance;

        return FeedTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#FBDBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
