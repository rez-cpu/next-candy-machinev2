import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { existsOwnerSPLToken, getNFTsForOwner } from "../utils/candyMachine";

const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const useWalletNfts = (props: any) => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isSPLExists, setSPLExists] = useState(false);

  const [nfts, setNfts] = useState<Array<any>>([]);

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
      console.log("isSPLExists " + isSPLExists);
      setSPLExists(isExistSPLToken);

      const nftsForOwner = await getNFTsForOwner(connection, wallet.publicKey);

      setNfts(nftsForOwner as any);
      // console.log(nftsForOwner);
      setIsLoading(false);
    })();
  }, [wallet]);

  return [isLoading, nfts, isSPLExists];
};

export default useWalletNfts;
