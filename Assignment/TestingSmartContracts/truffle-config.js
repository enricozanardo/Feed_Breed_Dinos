// * Use this file to configure your truffle project. It's seeded with s/o * common settings for different networks and features like migratio/n * compilation, and testing. Uncomment the ones you need or mod/i * them to suit your project as necessar * More information about configuration can be found /a  * https://trufflesuite.com/docs/truffle/reference/configurati * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provid/e * to sign your transactions before they're sent to a remote public node. Infura accou/n * are available for free at: infura.io/regist/e * You'll also need a mnemonic - the twelve word phrase the wallet uses to gener/a * public/private key pairs. If you're publishing your code to GitHub make sure you load t/h * phrase from a file you've .gitignored so it doesn't accidentally become publ/i // const HDWalletProvider = require('@truffle/hdwallet-provider/'// const fs = require('fs'// const mnemonic = fs.readFileSync(".secret").toString().trim(/)
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
