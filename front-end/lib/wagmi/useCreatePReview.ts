import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGradingDeployer.json";

interface Args {
  participants: string[];
  workload: number;
  ipfsHash: string;
}

export function useCreatePReview({ participants, workload, ipfsHash }: Args) {
  const { config } = usePrepareContractWrite({
    address: `0xB7BD05a4d5EF3a3DbD1D4EBC350389Df3cd9455c`,
    abi,
    functionName: "deployPeerGrading",
    args: [participants, workload, ipfsHash],
  });

  return useContractWrite(config);
}
