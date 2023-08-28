import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
    signer?: Signer | null;
    contract?: string;
};

const getVoted = async ({ contract, signer }: IGetSharesProps) => {
    if (!contract || !signer) {
        console.log("aqui getVoted");
        return "0.0";
    }
    
    const RdContract = new ethers.Contract(contract, abi, signer);
  
    const p = RdContract.on("Voted", (participant) => {
      let info = {
      participant: ethers.utils.getAddress(participant)
    }
      console.log("Voted", JSON.stringify(info));
    });

   return p;
};
  
const onError = (e: any) => {
    console.log(e);
};
  
type UseGetSharesProps = {
    contract?: string;
};
  
const useReadVoted = ({ contract }: UseGetSharesProps = {}) => {
    const { address: account } = useAccount();
    const { data: signer } = useSigner();
  
    console.log({ signer, contract });
  
    return useQuery(
      [QueryKeys.READ_RANDOMNESS, account],
      async () => {
        await getVoted({
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
  
export { getVoted, useReadVoted };