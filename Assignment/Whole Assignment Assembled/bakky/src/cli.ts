// For .env file management
import * as dotenv from 'dotenv';
dotenv.config();


import readlineSync from "readline-sync";
import { exec, cd, cp, pwd } from "shelljs";

const CFont = require("cfonts");
const clear = require("clear");


const enum Commands {
    test = "👍 Test Smart Contract 🤖 ",
    compile = "Compile Smart Contract 🧨 ",
    migrate = "Deploy/Migrate to Ganache Test Network",
    deploy = "Deploy to Rinkeby Test Network 🙌  💰",
    start = "Start FrontEnd 🚀 🚀 🚀",
    stop = "Stop FrontEnd",
    close = "Exit from Smarty",
}

const cmdTest = async () => {
    exec("truffle test", { async: true });

    loadCli();
}

  
const cmdCompile = async () => {
    // Compile the smart contract
    console.log(`compile...`)

    exec("truffle compile", { async: true });
 
    loadCli()
}

const cmdMigrate = async () => {
    // Compile the smart contract
    console.log(`deploy to Ganache Test Network...`)

    exec("truffle migrate", { async: true });
 
    loadCli()
}

const cmdCopyAbi = async (contractFileName: string) => {
    // Copy the Abi file to the Frontend Application
    console.log(`copying...`);

    // let currentFolder = pwd()
    // let origin = `${currentFolder}/src/build/${contractFileName}.abi`

    // cd('../frontend/src/contracts');

    // let destination = pwd()

    // cp(`${origin}`,`${destination}`);

    console.log(`copying done!`);
}

const cmdCopySmartContractAddress = async (smartContractAddress: string) => {
    // Copy the Deployed smart contract Address to the Frontend Application
    console.log(`copying smart contract Address...`);

    // cd('../frontend/src/contracts');

    // exec(`printf ${smartContractAddress} > contractAddress.txt`);

    console.log(`copying smart contract Address done!`);

}

const cmdStopFrontEnd = async () => {
    // Start the Frontend Application
    console.log(`Stop Frontend Application..`)

    exec(`npm run stop`);

    console.log(`Frontend stopped`);

    loadCli();
}


const cmdStartFrontEnd = async () => {
    // Start the Frontend Application
    console.log(`Starting Frontend Application..`)

    exec(`npm run frontend`);

    console.log(`Frontend Started http://localhost:3000`);

    loadCli();
}

const cmdDeploy = async () => {
    // Deploy the smart contract to Rinkeby Test network
    console.log(`deploy to Rinkeby Test Network...`)

    exec("truffle migrate --network rinkeby", { async: true });

    loadCli()
}

const loadCli = () => {
    setTimeout(() => {
      back();
    }, 8000);
}

const back = async () => {
    if (readlineSync.keyInYN("Go back?")) {
        cli();
    } else {
        process.exit();
    }
}


export const cli = async () => {
    clear();
  
    CFont.say(`Bakky`, {
      align: "center",
      font: "block",
      colors: ["yellow", "#f80"],
    });
  
    CFont.say(`Version: 0.0.1 - Enrico Zanardo(c)`, {
      align: "center",
      font: "console",
      colors: ["yellow"],
    });
  
    var menu = require("readline-sync"),
      commands = [
        Commands.test,
        Commands.compile,
        Commands.migrate,
        Commands.deploy,
        Commands.start,
        Commands.stop,
        Commands.close
      ],
      index = menu.keyInSelect(commands, "Commands");
  
    switch (commands[index]) {
        case Commands.test:
        await cmdTest();
        break;
        case Commands.compile:
            await cmdCompile();
            break;
        case Commands.migrate:
            cmdMigrate();
            break;
        case Commands.deploy:
            cmdDeploy();
            break;
        case Commands.start:
            cmdStartFrontEnd();
            break;
        case Commands.stop:
            cmdStopFrontEnd();
            break;
        case Commands.close:
            process.exit();
            break;
        default:
            cli();
            break;
        }
}

  