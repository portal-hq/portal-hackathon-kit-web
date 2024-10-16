# Portal Hackathon Kit - Web

![Portal Logo](https://cdn.prod.website-files.com/66a9400bd5456b4248f11c92/66a940c97f391719bd5ba2b9_Portal%20logo%201.png)

This is simple repo used to build an application using Portal's MPC wallet infrastructure.

## Requirements

Before going through the quick start you'll need following tools with the minimum versions:

- git
- Node (^20.16.0)
- yarn or npm
- [Portal Account](https://docs.portalhq.io/support/hackathon-hub)
- [Portal Client API Key](https://docs.portalhq.io/resources/authentication-and-api-keys#creating-a-test-client-api-key)

## Getting Started

To get spun up follow these steps.

1. Clone the repo and install dependencies.
   ```bash
   git clone https://github.com/portal-hq/portal-hackathon-kit-web
   cd portal-hackathon-kit-web
   yarn
   ```
2. Paste your Portal Client API Key into the `next.config.mjs` file.
3. Run the example app.
   ```bash
   yarn dev
   ```
4. Press "Get Solana Wallet" to create a wallet. You'll see your Solana address.
5. Take your address and go to the [PYUSD faucet](https://faucet.paxos.com/) to get some test PYUSD.

## Understanding the Repo

- `pages` and `components` contain files for all the [web pages or routes](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) and reusable [React components](https://react.dev/learn/your-first-component)
- `providers` contains [React contexts and respective providers](https://react.dev/learn/passing-data-deeply-with-context) i.e. shared state and logic for use across the app
- `public` contains all the [static images (or assets)](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets) used
- `theme` contains [MUI theming context](https://mui.com/material-ui/customization/theming/) which defines the base style for UI elements
- `next.config.mjs` contains [non-sensitive environment variables](https://nextjs.org/docs/pages/api-reference/next-config-js/env)

## Portal Documentation

### Portal SDK Reference

Portal's SDKs have several pieces of core functionality.

- [Generating a Wallet](https://docs.portalhq.io/guides/web/create-a-wallet): This function creates MPC key shares on your local device and the Portal servers. These key shares support all EVM chains and Solana.
- [Signing a Transaction](https://docs.portalhq.io/guides/web/sign-a-transaction): This function signs a provided transaction, and can broadcast that transaction to a chain when an RPC gateway URL is provided.
- [Signature Hooks](https://docs.portalhq.io/guides/web/add-custom-signature-hooks): By default this repo will submit a transaction without prompting a user, but you can use signature hooks to build a prompt for users before submitting a transaction for signing.

### Portal APIs

Portal supplies several APIs for simplifying your development.

- [Get Assets](https://docs.portalhq.io/reference/client-api/v3-endpoints#get-assets-by-chain): This endpoint returns a list of fungible asset (native, ERC-20, and SPL tokens) associated with your client for a given chain.
- [Get NFTs](https://docs.portalhq.io/reference/client-api/v3-endpoints#get-nft-assets-by-chain): This endpoint returns a list of the NFTs associated with your client for a given chain.
- [Get Transactions](https://docs.portalhq.io/reference/client-api/v3-endpoints#get-transactions-by-chain): This endpoint returns a list of the historic transactions associated with your client for a given chain.
- [Build a Transaction - Send Asset](https://docs.portalhq.io/reference/client-api/v3-endpoints#build-a-send-asset-transaction): This endpoint builds a formatted transaction to send a fungible asset (native, ERC-20, and SPL tokens) for a given chain.
- [Evaluate a Transaction](https://docs.portalhq.io/reference/client-api/v3-endpoints#evaluate-a-transaction): This endpoint can simulate a transaction and/or scan a transaction for security concerns.

### PYUSD Documentation

- [PYUSD on Solana](https://solana.com/news/pyusd-paypal-solana-developer): An overview of PYUSD on Solana.
- [PYUSD Quick Start Guide](https://developer.paypal.com/community/blog/pyusd-quick-start-guide/): A quick overview of PYUSD and information behind it.
- [PYUSD Solana Testnet Faucet](https://faucet.paxos.com/): Use this faucet to get testnet PYUSD on Solana.
- [What is PayPal USD](https://www.paypal.com/us/cshelp/article/what-is-paypal-usd-pyusd-help1005): Information about how PYUSD works.
- [PYUSD Solana (SPL) Mainnet Address](https://explorer.solana.com/address/2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo): `2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo`
- [PYUSD Solana (SPL) Devnet Address](https://explorer.solana.com/address/CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM?cluster=devnet): `CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM`

### Solana Documentation

- [Intro to Solana Development](https://solana.com/developers/guides/getstarted/hello-world-in-your-browser): An introduction to development on Solana.
- [Solana SPL Token Docs](https://spl.solana.com/token): Documentation on SPL tokens.

### Faucets

- [SOL Faucet](https://faucet.solana.com/)
- [PYUSD Faucet](https://faucet.paxos.com/)

### Other Helpful Resources

- [What is Portal MPC?](https://docs.portalhq.io/resources/portals-mpc-architecture)

## Help

Need help or want to request a feature? Reach out to us on the [official Portal Community Slack](https://portalcommunity.slack.com/archives/C07EZFF9N78).
