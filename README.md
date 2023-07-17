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
  - [Testing](#testing)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
- [Thank you!](#thank-you)



# About

Introducing the Decentralized Ticket Marketplace, a smart contract built on the Ethereum blockchain using the ERC721 standard to manage NFT (Non-Fungible Token) tickets. This innovative marketplace provides a secure and transparent platform for handling ticket transactions for various occasions and events. Through the smart contract, users can easily create occasions, specifying essential details such as occasion name, ticket cost, maximum ticket availability, date, time, and location. These occasions are stored on the blockchain, ensuring immutability and accessibility for all participants.

Once an occasion is listed, users can seamlessly purchase tickets for their desired events. Each ticket represents a unique NFT, providing a digital representation of the purchased ticket. By leveraging the power of NFTs, users gain ownership over their event tickets, enabling easy transferability, verification, and secure storage. With this decentralized ticket marketplace, event organizers can reach a broader audience, while attendees enjoy a frictionless ticketing experience, free from intermediaries and counterfeit concerns. Embrace the future of ticketing with the NFT-powered Decentralized Ticket Marketplace.

Key Features:

- Creation of occasions with detailed event information.
- Purchase of unique NFT tickets for listed occasions.
- Secure ownership and transferability of event tickets through NFTs.
- Elimination of counterfeit ticketing and intermediary involvement.
- Transparent and immutable storage of occasion data on the Ethereum blockchain.


# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [hardhat](https://hardhat.org/)
  - You'll know you did it right if you can run `npx hardhat --version
` and you see a response like `2.12.7`

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
