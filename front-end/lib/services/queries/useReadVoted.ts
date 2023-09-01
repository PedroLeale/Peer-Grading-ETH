import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
    signer?: Signer | null;
    contract?: string;
};

const getVoted = async ({ contractAddress }: IGetSharesProps) => {
    if (!contractAddress) {
        console.log("error in getVoted");
        return "0.0";
    }
    
    const contract = new ethers.Contract(contractAddress, abi);
    const provider = new ethers.providers.JsonRpcProvider(
      String(process.env.NEXT_PUBLIC_RPC_URL)
    );
  
    const filter = contract.filters.Voted();
  
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
  
const useReadVoted = ({ contract }: UseGetSharesProps = {}) => {
    return useQuery(
      [QueryKeys.GET_PARTICIPANTS, contract],
      async () => {
        await getVoted({
          contractAddress: contract,
        });
      },
      {
        onError,
        enabled: !!contract,
      }
    );
};
  
export { getVoted, useReadVoted };