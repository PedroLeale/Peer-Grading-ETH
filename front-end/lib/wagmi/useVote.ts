import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGradingDeployer.json";
import { contractConstants } from "@/config/contractConstants";

export function useVote() {
  const { config } = usePrepareContractWrite({
    address: contractConstants.PeerGradingAddress as `0x${string}`,
    abi,
    functionName: "vote",
    args: [],
  });
  return useContractWrite(config);
}
