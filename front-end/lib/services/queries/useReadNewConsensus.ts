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
    
    const RdContract = new ethers.Contract(contract, abi, signer);
  
    const p = RdContract.on("NewConsensus", (consensusVector, sender) => {
      let info = {
      consensusVector: ethers.utils.arrayify(consensusVector),
      sender: ethers.utils.getAddress(sender)
    }
      console.log("NewConsensus", JSON.stringify(info));
    });

   return p;
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
  
    console.log({ signer, contract });
  
    return useQuery(
      [QueryKeys.READ_RANDOMNESS, account],
      async () => {
        await getNewConsensus({
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
  
export { getNewConsensus, useReadNewConsensus };