import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGrading.json";

interface Args {
  PeerGradingAddress: string;
}

export function useVote({ PeerGradingAddress }: Args) {
  const { config } = usePrepareContractWrite({
    address: PeerGradingAddress as `0x${string}`,
    abi,
    functionName: "vote",
    args: [],
  });
  return useContractWrite(config);
}
