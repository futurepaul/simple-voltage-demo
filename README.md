# Lightning hackathon node starter guide

If you're at a [Voltage-sponsored hackathon](https://app.voltage.cloud/satsx) ask for a hot deal on "free lightning nodes" to get the code. 

## Create a node (or a couple)

[Voltage quick start guide](https://docs.voltage.cloud/voltage-quick-start-guide)

1. Pick a name for your node
2. Password is important because voltage can't reset it for you. It's how your browser encrypts your macaroons so we can store them without seeing them.
3. Takes about 30 seconds to spin up

## Get some channels open

Launch the ThunderHub dashboard (hope you remembered your password!). If it says "Not Synced" you gotta wait until your node is synced. Also, check out the Peers tab to see what it says. No peers, no network!

### Lightning faucet

The first think I'd try is [Lightning faucet](https://faucet.lightning.community). Add their full url to your peers (they probably won't be able to find you otherwise, testnet is not great at gossip).

Now paste your node pubkey and fill in the channel params. They'll make a channel to you! Now you wait three blocks for your channel to be active.

You can paste the txid into [mempool.space/testnet](https://mempool.space/testnet) to track its progress. Testnet is wacky so it could take one minute or it could take three hours. (I recommend trying to get your channels up and running right at the start of the hackathon so you're not waiting for channel opens at the last minute).

### Regular testnet faucet

If you can't get a lightning faucet to work for you, you'll have to get liquidity the old fashioned way. Send Testnet Bitcoin to your node, then use that TBTC to open channels to other testnet nodes.

A few faucets to try:
- https://bitcoinfaucet.uo1.net
- https://testnet-faucet.mempool.co
- https://coinfaucet.eu/en/btc-testnet/

## Using your node

Once you have liquidity on a testnet Lightning node it's finally time to start hacking!

This README is inside a minimal [Next.js](https://nextjs.org) project that can talk to an LND node. It uses Next's api routes to keep sensitive information (your node endpoint and macaroons) out of "client-side" code.

I've implemented two features to help you get started:

### 1. Bake an invoice macaroon

You can get your admin macaroon in Voltage's connect tab, under "Manual". This gives you full control over your node. But if you want a more restrictive macaroon for, say, just generating invoices, you can "bake" macaroons with a subset of these permissions.

The magic happens in `/api/bake.ts`. You'll need your admin macaroon in you `.env.local` for it to work

`.env.local` should look something like this:

```env
API_ENDPOINT=your-node-name.t.voltageapp.io
ADMIN_MACAROON_HEX=0201036C6E6402F801030A1076DCE62C9D3D...
```

The actual REST call to LND looks like this:
```ts
fetch(`https://${endpoint}:8080/v1/macaroon`, {
    method: "POST",
    body: JSON.stringify(invoicePermissions),
    headers: {
      "Grpc-Metadata-Macaroon": macaroonHex,
    },
});
```

To see the other endpoints and payloads available, check out the [LND API docs](https://api.lightning.community/#lnd-rest-api-reference).

If you `npm install` and `npm run dev` this project you should be able to now get the invoice macaroon using the UI.

To look inside your invoice macaroon, you can paste it into [this cool cryptography toolki](https://guggero.github.io/cryptography-toolkit/#!/macaroon) (obviously not a great idea with an admin macaroon to a real node with real funds on it).

### 2. Generate an invoice

Save the invoice macaroon to your `.env.local` to see the next part of the UI, which allows you to generate an invoice using LND's `/v1/invoices` API.

To decode the meaning of the returned invoice check out [Lightning Payment Request Decoder](https://lndecode.com).

## Backup strat

If you don't want to wait for testnet confirmations -- or don't want to mess with cloud hosting right now -- I highly recommend [Polar](https://lightningpolar.com).

Polar lets you fire up a regtest lightning network on your local machine using Docker, and it's all point-and-click GUI.

Once you design the Polar network of your dreams, the setup is pretty similar to the instructions above. You grab the `REST Host` (should look something like `127.0.0.1:8081`) instead of the Voltage endpoint. There's a tab where you can copy the Admin Macaroon in HEX format. Put those values in your `.env.local`, along with this scary line:

```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Because Polar uses self-signed certificates for https this override keeps things running smoothly. Obviously you wouldn't want this in production.

# glhf