Nextjs implementation for Candy Machine v2

credit to @maxwellfortney for next-candy-machine repo
https://github.com/maxwellfortney/next-candy-machine

Simple implementation of metaplex candy machine v2, code was ported from FLP and maxwells repo.
Tested Captcha in dev, and minted on main without captcha.

2 main variables are NEXT_PUBLIC_CANDY_MACHINE_ID and NEXT_PUBLIC_AIRDROP_TOKEN

candy machine id is the account of the CM, use the public airdrop token for whitelist. The UI will check the connected wallet for the airdrop token and if so, show a reduced timer to mint early for the mint and use the whiteList price settings on UI.

Fill in the empty images/header/title as needed.

# Environment Variables

NEXT_PUBLIC_CANDY_MACHINE_ID=
NEXT_PUBLIC_AIRDROP_TOKEN=

NEXT_PUBLIC_SOLANA_NETWORK=
NEXT_PUBLIC_SOLANA_RPC_HOST=
