/**
 * Custom JS

 */

initWeb3: function() {

    // Initialize web3 and set the provider to the testRPC.

    if (typeof web3 !== 'undefined') {

        App.web3Provider = web3.currentProvider;

        web3 = new Web3(web3.currentProvider);

    } else {

        // set the provider you want from Web3.providers

        App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');

        web3 = new Web3(App.web3Provider);

    }



    return App.initContract();

}