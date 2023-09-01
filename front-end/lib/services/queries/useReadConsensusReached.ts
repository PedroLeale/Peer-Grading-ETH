import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
    signer?: Signer | null;
    contract?: string;
};

const getConsensusReached = async ({ contractAddress }: IGetSharesProps) => {
    if (!contractAddress) {
        console.log("error in getConsensusReached");
        return "0.0";
    }
    
    const contract = new ethers.Contract(contractAddress, abi);
    const provider = new ethers.providers.JsonRpcProvider(
      String(process.env.NEXT_PUBLIC_RPC_URL)
    );
      
    const filter = contract.filters.ConsensusReached();  
    // Optionally: Set a range to fetch logs from
    // For the latest block:
    const latestBlock = await provider.getBlockNumber();
    filter.fromBlock = 39647954;
    filter.toBlock = latestBlock;

    // Fetch the logs
    const logs = await provider.getLogs(filter);

    // Parse the logs to get the event data
    const events = logs.map((log) => contract.interface.parseLog(log));

    return events;
};
  
const onError = (e: any) => {
    console.log(e);
};
  
type UseGetSharesProps = {
    contract?: string;
};
  
const useReadConsensusReached = ({ contract }: UseGetSharesProps = {}) => {
    return useQuery(
      [QueryKeys.GET_PARTICIPANTS, contract],
      async () => {
        await getConsensusReached({
          contractAddress: contract,
        });
      },
      {
        onError,
        enabled: !!contract,
      }
    );
};
  
export { getConsensusReached, useReadConsensusReached };