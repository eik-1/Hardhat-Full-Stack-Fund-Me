# Hardhat-Full-Stack-Fund-Me

This is a fullstack project developed using hardhat and solidity. This project will take funds from user and store them in a wallet.
This is a minimalistic example what you can find in the [metamask docs](https://docs.metamask.io/guide/create-dapp.html#basic-action-part-1).

# Requirements

-   [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    -   You'll know you've installed it right if you can run:
        -   `git --version`
-   [Metamask](https://metamask.io/)
    -   This is a browser extension that lets you interact with the blockchain.
-   [Nodejs](https://nodejs.org/en/)
    -   You'll know you've installed nodejs right if you can run:
        -   `node --version` And get an ouput like: `vx.x.x`
-   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
    -   You'll know you've installed yarn right if you can run:
        -   `yarn --version` And get an output like: `x.x.x`
        -   You might need to install it with npm

# Quickstart

1. Clone the repo

```
git clone https://github.com/eik-1/Hardhat-Full-Stack-Fund-Me
cd Hardhat-Full-Stack-Fund-Me
```

2. Run the file.

You can usually just double click the file to "run it in the browser". Or you can right click the file in your VSCode and run "open with live server".

Optionally:

If you'd like to run with prettier formatting, or don't have a way to run your file in the browser, run:

```
yarn
yarn http-server
```

And you should see a small button that says "connect".

Hit it, and you should see metamask pop up.

# Execute a transaction

If you want to execute a transaction follow this:

Make sure you have the following installed:

1. You'll need to open up a second terminal and run:

```
git clone https://https://github.com/eik-1/Hardhat-Fund-Me
cd Hardhat-Fund-Me
yarn
yarn hardhat node
```

This will deploy a sample contract and start a local hardhat blockchain.

2. Update your `constants.js` with the new contract address.

In your `constants.js` file, update the variable `contractAddress` with the address of the deployed "FundMe" contract. You'll see it near the top of the hardhat output.

3. Connect your [metamask](https://metamask.io/) to your local hardhat blockchain or just switch to Sepolia testnet.

> **PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.**
> I usually use a few different browser profiles to separate my metamasks easily.

In the output of the above command, take one of the private key accounts and [import it into your metamask.](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)

Additionally, add your localhost with chainid 31337 to your metamask.

5. Reserve the front end with `yarn http-server`, input an amount in the text box, and hit `fund` button after connecting

# Thank you!

[<img height="32" width="32" src="https://cdn.simpleicons.org/instagram/dcd0ff"/>](https://www.instagram.com/eik.crimes/) [<img height="32" width="32" src="https://cdn.simpleicons.org/twitter/dcd0ff"/>](https://twitter.com/sarthakrawatbiz) [<img height="32" width="32" src="https://cdn.simpleicons.org/linkedin/dcd0ff"/>](https://www.linkedin.com/in/sarthak-raw-eth/)
