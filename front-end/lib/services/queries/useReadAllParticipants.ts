import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
    signer?: Signer | null;
    contract?: string;
};

const getAllParticipants = async ({ contract, signer }: IGetSharesProps) => {
    if (!contract || !signer) {
        return "0.0";
    }
    
    const RdContract = new ethers.Contract(contract, abi, signer);
  
    RdContract.on("AddedParticipant", (participant: any, assignmentId: bigint) => {
        console.log("AddedParticipant", participant, assignmentId);
    });

};
  
const onError = (e: any) => {
    console.log(e);
};
  
type UseGetSharesProps = {
    contract?: string;
};
  
const useReadAllParticipants = ({ contract }: UseGetSharesProps = {}) => {
    const { address: account } = useAccount();
    const { data: signer } = useSigner();
  
    console.log({ signer, contract });
  
    return useQuery(
      [QueryKeys.READ_RANDOMNESS, account],
      async () => {
        await getAllParticipants({
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
  
export { getAllParticipants, useReadAllParticipants };

