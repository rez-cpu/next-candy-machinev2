// import { useMemo } from "react";
import Home from "../components/Home";
import * as anchor from "@project-serum/anchor";
// import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   getPhantomWallet,
//   getSolflareWallet,
//   getSolletWallet,
// } from "@solana/wallet-adapter-wallets";

// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";

// import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

console.log(network, rpcHost);
const startDateSeed = parseInt(process.env.NEXT_PUBLIC_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home
        candyMachineId={candyMachineId}
        connection={connection}
        startDate={startDateSeed}
        txTimeout={txTimeout}
        rpcHost={rpcHost}
      />
    </ThemeProvider>
  );
};

export default App;
