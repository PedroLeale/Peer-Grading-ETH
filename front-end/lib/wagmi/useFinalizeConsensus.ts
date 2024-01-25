import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGrading.json";

interface Args {
  PeerGradingAddress: string;
}

export function useFinalizeConsensus({ PeerGradingAddress }: Args) {
  const { config } = usePrepareContractWrite({
    address: PeerGradingAddress as `0x${string}`,
    abi,
    functionName: "finalizeConsensus",
    args: [],
  });
  return useContractWrite(config);
}
