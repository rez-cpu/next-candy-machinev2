import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { existsOwnerSPLToken, getNFTsForOwner } from "../utils/candyMachine";

const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const useSplToken = () => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isSPLExists, setSPLExists] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      setIsLoading(true);

      const isExistSPLToken = await existsOwnerSPLToken(
        connection,
        wallet.publicKey
      );
      setSPLExists(isExistSPLToken);

      setIsLoading(false);
      console.log(
        "isSPLExists " + isExistSPLToken,
        " ",
        wallet.publicKey.toString()
      );
    })();
  }, [wallet]);

  return [isLoading, isSPLExists];
};

export default useSplToken;
