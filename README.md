# Feed_Breed_Dinos

function buyTokens: send wei to buy tokens. (1 wei = 1 token)

function buyFoodWithTokens: send FeedTokens to buy food. (1 token = 1 food)

function createRandomDino: input a name and generate the first dinosaur. (no more than 1 per address!)

function feedAndMultiply: input DinoName and the _targetDna of the dinosaur you are feeding.

function balanceOf: input address to check FeedToken balance.

function dinos: After creating the first dino, you can input dinoId (starts at index 0).

function dinoToOwner: Map specific dino to owner. Uses Dinosaur name instead of ID.

function feedToken: gets tokenAddress;

function food: Gets food balance of this address.

function foodPrice: gets current price of food.

function tokenPrice: gets current price of token.

## BACKEND TESTING (NOT UNIT TESTS)
## Testing of the contract on Local Host using Ganache, Remix and Metamask.

During development of the back-end part, the functions were all tested on local host using ganache-cli, Remix and MetaMask.
All functions work as intended when using the injected web3 feature of Remix to connect with the ganache local blockchain.

## BuyToken Test:
Owner cannot buy tokens, when tokens are bought, the owner's balance is deducted, the buyers balance is adjusted accordingly.
The buyer must send Wei to buy tokens. If no Wei are sent, the transaction is cancelled. MetaMask wallets show transactions and
Balances are displayed accordingly, except that of the owner, which for some obscure reason always appears as 0 on Metamask,
but further testing and buying shows the right amounts for the buyers and the balances of both buyers and owner are adjusted accordingly as expected.

PASS
## BuyFoodWithToken Test:
Owner cannot buy food or feed any dinosaur. Owner can only deploy. Buyer can buy food with tokens. When buyer specifies how much food they want
to buy, the amount of tokens required are automatically deducted and sent back to the owner to become part of the supply. The balances of both
owner and buyers adjust accordingly. On Metamask, gas fees are paid to buy food with tokens as expected.

PASS
## CreateRandomDino Test:
Owner cannot create dino. When user creates a dino, they must insert a name. A random dino with random DNA is generated.
Only one random dino per wallet address can be created. Future dinosaurs must be obtained by feeding the first randomly generated dino.

PASS
## FeedAndMultiply Test: 
Owner cannot feed or multiply dinos. When user feeds a dino, they must input its name e.g 'My First Dino' and the target dna of said dino
which can be obtained by using the 'dinos' function. When fed, Dinos will give birth to a child with random DNA.

PASS
## BalanceOf Test:
Owners and Buyers can check the balance of any address. This function served as foundation to test that balances are adjusting as expected.

PASS
## Dinos Test:
This function returns the name of the dinosaur and its DNA sequence. It expects an index, starting from 0. It works as expected.

PASS
## DinoToOwner Test:
Using the Dinosaur Name, the owner of the dino can be returned (address).

PASS

## feedToken Test:
Returns the address of the ERC20 coin.

PASS
## food Test:
Returns the value of the number of held food by the wallet address. 

PASS
## foodPrice Test:
Returns the cost of food in Tokens.

PASS
## tokenPrice Test:
Returns the cost of Tokens in Wei.

Test


