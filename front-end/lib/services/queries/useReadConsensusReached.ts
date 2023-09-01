import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
    signer?: Signer | null;
    contract?: string;
};

const getConsensusReached = async ({ contract, signer }: IGetSharesProps) => {
    if (!contract || !signer) {
        console.log("aqui getConsensusReached");
        return "0.0";
    }
    
    const RdContract = new ethers.Contract(contract, abi, signer);
  
    const p = RdContract.on("ConsensusReached", (consensusVector) => {
      let info = {
      consensusVector: ethers.utils.arrayify(consensusVector),
    }
      console.log("ConsensusReached", JSON.stringify(info));
    });

   return p;
};
  
const onError = (e: any) => {
    console.log(e);
};
  
type UseGetSharesProps = {
    contract?: string;
};
  
const useReadConsensusReached = ({ contract }: UseGetSharesProps = {}) => {
    const { address: account } = useAccount();
    const { data: signer } = useSigner();
  
    console.log({ signer, contract });
  
    return useQuery(
      [QueryKeys.READ_RANDOMNESS, account],
      async () => {
        await getConsensusReached({
          signer,
          contract,
        });
      },
      {
        onError,
        enabled: !!account,
      }
    );
};
  
export { getConsensusReached, useReadConsensusReached };