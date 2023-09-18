import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGradingDeployer.json";

interface Args {
  participants: string[];
  workload: number;
  ipfsHash: string;
}

export function useCreatePReview({ participants, workload, ipfsHash }: Args) {
  const { config } = usePrepareContractWrite({
    address: `0xe3ccd97F3448d53E07bfdBf9E5eA542CAC228C22`,
    abi,
    functionName: "deployPeerGrading",
    args: [participants, workload, ipfsHash],
  });

  return useContractWrite(config);
}
