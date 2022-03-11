# Hackathon Lightning node starter guide

If you're at a [Voltage-sponsored hackathon](https://app.voltage.cloud/satsx) ask for a hot deal on "free lightning nodes" to get the code. 

## Create a node (or a couple)

[Voltage quick start guide](https://docs.voltage.cloud/voltage-quick-start-guide)

1. Pick a name for your node
2. Password is important because voltage can't reset it for you. It's how your browser encrypts your macaroons so we can store them without seeing them.
3. Takes about 30 seconds to spin up

## Get some channels open

Launch the ThunderHub dashboard (hope you remembered your password!). If it says "Not Synced" you gotta wait until your node is synced. Go to peers... no peers? No network!

### Lightning faucet

First thing to try is a [Lightning faucet]. Add their full url to your peers (they probably won't be able to find you otherwise, testnet is not great at gossip).

Now paste your node pubkey and the channel params. They'll make a channel to you! Now you wait three blocks for your channel to be active.

Can paste the txid into [mempool.space/testnet](https://mempool.space/testnet) to track its progress. Testnet is wacky so could take one minute could take three hours. (I recommend trying to get your channels up and running right at the start of the hackathon so you're not waiting for channel opens at the last minute)

### Regular testnet faucet

If you can't get a lightning faucet to work for you, you'll have to get liquidity the old fashioned way. Send Testnet Bitcoin to your node, then use that TBTC to open channels to other testnet nodes.

A few faucets to try:
- https://bitcoinfaucet.uo1.net
- https://testnet-faucet.mempool.co
- https://coinfaucet.eu/en/btc-testnet/

## Using your node

Once you have liquidity on a testnet Lightning node it's finally time to start hacking!

This README is inside a minimal [next.js](https://nextjs.org) project that can talk to an LND node.

I've implemented two features:

### 1. Bake an invoice macaroon

You can get your admin macaroon in Voltage's connect tab, under "Manual". This gives you full control over your node. But if you want a more restrictive macaroon for, say, just generating invoices, you can "bake" macaroons with a subset of these permissions.

The magic happens in `/api/bake.ts`. You'll need your admin macaroon in you `.env.local` for it to work

`.env.local` should look something like this:

API_ENDPOINT=your-node-name.t.voltageapp.io
ADMIN_MACAROON_HEX=0201036C6E6402F801030A1076DCE62C9D3D...

If you `npm install` and `npm run dev` this project you should be able to now get the invoice macaroon using the UI.

To look inside your invoice macaroon, you can paste it into [this cool cryptography toolki](https://guggero.github.io/cryptography-toolkit/#!/macaroon) (obviously not a great idea with an admin macaroon to a real node with real funds on it).

### 2. Generate an invoice




https://lndecode.com





, then displays it as a QR code. It's up to you to come up with something more interesting to do with this pile of tech.




https://guggero.github.io/cryptography-toolkit/#!/macaroon











1. Add peers.
2. Open channe

this googling around... https://faucet.lightning.community
white_check_mark
eyes
raised_hands





8:58
working on a guide for hackathon participants to getting a testnet node up on voltage and getting some liquidity to it

gkrizek:spiral_calendar_pad:  9:01 AM
I think that faucet just opens up channels to you? but still a faucet for lightning. Other ones:
https://bitcoinfaucet.uo1.net
https://testnet-faucet.mempool.co
https://coinfaucet.eu/en/btc-testnet/



password is important because we can't recover this for you




create your node...

get some liquidity probably!


anyway now you can remote control it with the url + macaroon