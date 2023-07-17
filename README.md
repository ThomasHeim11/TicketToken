# TicketToken 
This is a decentralized ticket marketplace smart contract for managing NFT (Non-Fungible Token) tickets using the ERC721 standard. The smart contract allows the creation of occasions (events) with specific details such as the name, cost of each ticket, maximum tickets available, date, time, and location. Users can then buy tickets for these occasions, and each ticket is represented as a unique NFT.

<img width="1797" alt="Screenshot 2023-07-17 at 04 53 40" src="https://github.com/ThomasHeim11/StableCryptoDollar/assets/106417552/a7d3cc2c-2b59-4f10-8689-23d269f9f15a">

- [About](#about)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
    - [Optional Gitpod](#optional-gitpod)
- [Updates](#updates)
- [Usage](#usage)
  - [Start a local node](#start-a-local-node)
  - [Deploy](#deploy)
  - [Deploy - Other Network](#deploy---other-network)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
  - [Scripts](#scripts)
  - [Estimate gas](#estimate-gas)
- [Formatting](#formatting)
- [Thank you!](#thank-you)



# About

StableCrypto Dollar (SCD) is a decentralized, algorithmic stablecoin designed to maintain stability relative to the United States Dollar (USD). The contract, owned by DSCEngine, operates as an ERC20 token and enables users to mint and burn tokens through interaction with the DSCEngine smart contract.

SCD's stability is ensured through a collateralization mechanism where users can deposit WETH (Wrapped Ether) and WBTC (Wrapped Bitcoin) in exchange for the stablecoin. These collateralized assets provide the necessary backing to maintain the peg to the USD, giving users confidence in the stability of the StableCrypto Dollar.

As an algorithmic stablecoin, StableCrypto Dollar does not rely on a centralized entity to control its minting and burning processes. Instead, it employs an algorithmic approach, automatically adjusting the token supply based on demand and market conditions to maintain its peg to the USD.

This design allows StableCrypto Dollar to be independent of traditional financial systems and provides a decentralized alternative for users seeking a stable store of value and medium of exchange within the cryptocurrency ecosystem. Users can leverage the stability and convenience of StableCrypto Dollar for various use cases such as trading, remittances, and as a hedging instrument in the volatile cryptocurrency market.



# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [foundry](https://getfoundry.sh/)
  - You'll know you did it right if you can run `forge --version` and you see a response like `forge 0.2.0 (816e00b 2023-03-16T00:05:26.396218Z)`

## Quickstart

```
git clone https://github.com/ThomasHeim11/TicketToken.git
npm install
```

### Optional Gitpod

If you can't or don't want to run and install locally, you can work with this repo in Gitpod. If you do this, you can skip the `clone this repo` part.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/PatrickAlphaC/foundry-smart-contract-lottery-f23)

# Updates
- The latest version of openzeppelin-contracts has changes in the ERC20Mock file. To follow along with the course, you need to install version 4.8.3 which can be done by ```forge install openzeppelin/openzeppelin-contracts@v4.8.3 --no-commit``` instead of ```forge install openzeppelin/openzeppelin-contracts --no-commit```

# Usage

## Start a local node

```
make anvil
```

## Deploy

This will default to your local node. You need to have it running in another terminal in order for it to deploy.

```
make deploy
```

## Deploy - Other Network

[See below](#deployment-to-a-testnet-or-mainnet)

## Testing

We talk about 4 test tiers in the video. 

1. Unit
2. Integration
3. Forked
4. Staging

In this repo we cover #1 and Fuzzing. 

```
forge test
```

### Test Coverage

```
forge coverage
```

and for coverage based testing: 

```
forge coverage --report debug
```


# Deployment to a testnet or mainnet

1. Setup environment variables

You'll want to set your `SEPOLIA_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `SEPOLIA_RPC_URL`: This is url of the goerli testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

Optionally, add your `ETHERSCAN_API_KEY` if you want to verify your contract on [Etherscan](https://etherscan.io/).

1. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

2. Deploy

```
make deploy ARGS="--network sepolia"
```

## Scripts

Instead of scripts, we can directly use the `cast` command to interact with the contract. 

For example, on Sepolia:

1. Get some WETH 

```
cast send 0xdd13E55209Fd76AfE204dBda4007C227904f0a81 "deposit()" --value 0.1ether --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```

2. Approve the WETH

```
cast send 0xdd13E55209Fd76AfE204dBda4007C227904f0a81 "approve(address,uint256)" 0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98 1000000000000000000 --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```

3. Deposit and Mint DSC

```
cast send 0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98 "depositCollateralAndMintDsc(address,uint256,uint256)" 0xdd13E55209Fd76AfE204dBda4007C227904f0a81 100000000000000000 10000000000000000 --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```


## Estimate gas

You can estimate how much gas things cost by running:

```
forge snapshot
```

And you'll see and output file called `.gas-snapshot`


# Formatting


To run code formatting:
```
forge fmt
```

# Thank you!

If you appreciated this, feel free to follow !

[![Thomas HeimLinkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thomas-heim11/)
