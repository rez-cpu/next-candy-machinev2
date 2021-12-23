import * as anchor from "@project-serum/anchor";
import Typography from "@material-ui/core/Typography";
import { CandyMachineAccount } from "../helpers/candy-machine";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useWalletBalance from "../hooks/useWalletBalance";
export enum Phase {
  WaitForCM,
  Live,
  Unknown,
  NotLive,
}

export function getPhase(candyMachine: CandyMachineAccount | undefined): Phase {
  return Phase.Live;
}

interface DarkContainerProps {
  text: string | undefined;
  mintInfo?: boolean;
  whiteList?: boolean;
  candyMachine?: CandyMachineAccount | undefined;
}
export const DarkContainer = ({
  text,
  mintInfo,
  whiteList,
  candyMachine,
}: DarkContainerProps) => {
  const normalPrice: any | undefined = candyMachine?.state?.price;
  const discountPrice: any | undefined =
    candyMachine?.state?.whitelistMintSettings?.discountPrice;
  const balance = useWalletBalance()[0].toFixed(2);
  if (mintInfo) {
    return (
      <div
        className="lg:m-2 m-1 lg:p-5 p-2"
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          background: "#384457",
          color: "white",
          borderRadius: 5,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        <div className="flex flex-col mr-4">
          <div>Price</div>
          <div className="text-l font-normal">
            {whiteList
              ? discountPrice / LAMPORTS_PER_SOL
              : normalPrice / LAMPORTS_PER_SOL}
            &nbsp; SOL
          </div>
        </div>
        <div className="flex flex-col">
          <div>Balance</div>{" "}
          <div className="text-l font-normal">{balance} &nbsp; SOL</div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="lg:m-2 m-1 lg:p-5 p-2"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          background: "#384457",
          color: "white",
          borderRadius: 5,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {text}
      </div>
    );
  }
};

const Header = (props: {
  phaseName: string;
  desc: string;
  date: anchor.BN | undefined;
  status?: string | undefined;
  whiteList?: boolean | undefined;
  candyMachine?: CandyMachineAccount | undefined;
}) => {
  const { phaseName, desc, date, status, whiteList, candyMachine } = props;
  return (
    <div>
      <div>
        <Typography
          variant="h5"
          style={{ fontWeight: 600 }}
          className="text-white"
        >
          {phaseName} &nbsp;
          <small style={{ fontSize: 14 }}>
            ({candyMachine?.state.itemsRedeemed})
          </small>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {desc}
        </Typography>
      </div>
      <div className="flex flex-row">
        <DarkContainer text={status} />
        <DarkContainer
          text={``}
          mintInfo
          whiteList={whiteList}
          candyMachine={candyMachine}
        />

        {/* <PhaseCountdown
          date={toDate(date)}
          style={{ justifyContent: "flex-end" }}
          status={status || "COMPLETE"}
          
        /> */}
      </div>
    </div>
  );
};

type PhaseHeaderProps = {
  candyMachine?: CandyMachineAccount;
  rpcUrl: string;
  whiteList: boolean;
};

export const PhaseHeader = ({ candyMachine, whiteList }: PhaseHeaderProps) => {
  console.log("White Listed", whiteList, candyMachine);
  const phase = getPhase(candyMachine);
  return (
    <>
      {phase === Phase.Unknown && !candyMachine && (
        <Header
          phaseName={"Loading..."}
          desc={"Waiting for you to connect your wallet."}
          date={undefined}
        />
      )}

      {phase === Phase.Live && (
        <Header
          phaseName={`Project`}
          desc={"Project description"}
          date={candyMachine?.state.goLiveDate}
          status={whiteList ? "White List Activated" : "LIVE"}
          whiteList={whiteList}
          candyMachine={candyMachine}
        />
      )}
    </>
  );
};
