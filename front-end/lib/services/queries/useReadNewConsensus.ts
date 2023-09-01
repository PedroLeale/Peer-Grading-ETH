import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
  signer?: Signer | null;
  contract?: string;
};

const getNewConsensus = async ({ contract, signer }: IGetSharesProps) => {
  if (!contract || !signer) {
    console.log("aqui getNewConsensus");
    return "0.0";
  }

  return "";
};

const onError = (e: any) => {
  console.log(e);
};

type UseGetSharesProps = {
  contract?: string;
};

const useReadNewConsensus = ({ contract }: UseGetSharesProps = {}) => {
  const { address: account } = useAccount();
  const { data: signer } = useSigner();

  return useQuery(
    [QueryKeys.READ_RANDOMNESS, account, contract],
    async () => {
      await getNewConsensus({
        signer,
        contract,
      });
    },
    {
      onError,
      enabled: !!account && !!contract,
    }
  );
};

export { getNewConsensus, useReadNewConsensus };
