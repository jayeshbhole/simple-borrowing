# LAYs - Simple Borrower

LAYs is a proof of concept and a very simple borrowing smart contract.
LAY tokens are stable coins pegged to the US Dollar by using ETH as collateral and the Chainlnk pricefeeds.

## Issuance

When the users deposit `ETH` or borrow `LAYs` from the smart contract, their `ETH` is locked up as collateral. The chainlink price feeds are used to fetch price of `ETH/USD`. This price is used to calculate the amount of LAYs that should be issued as loan to the user.

## Repayment

Let's say you're done getting LAYed and you want your collateral back. Just call the `withdraw` function and specify the amount of LAYs you want to give back. LAYs will be burned and ETH will be returned to your account proportional to it's worth.

## UI

The UI is fairly simple and it consists of one tab each for borrowing and withdrawing. The code uses Moralis for fetching data and ChakraUI to make everything look nice and smooth.

### Quick Links

[`LAYs Token Contract`](https://rinkeby.etherscan.io/address/0x3ce62C054C04D9433a28eAe1Be6d794a89e11Ace#readContract)

[`SimpleVault Token Contract`](https://rinkeby.etherscan.io/address/0x712E6550D1Bc727a6c62D579ca5a7956332a7381#readContract)

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
