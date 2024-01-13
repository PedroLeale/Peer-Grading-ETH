import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGradingDeployer.json";
import { contractConstants } from "@/config/contractConstants";

interface Args {
  participants: string[];
  workload: number;
  ipfsHash: string;
}

// TODO: tratar erros de criação de contrato.
export function useCreatePReview({ participants, workload, ipfsHash }: Args) {
  const { config } = usePrepareContractWrite({
    address: contractConstants.PeerGradingAddress as `0x${string}`,
    abi,
    functionName: "deployPeerGrading",
    args: [participants, workload, ipfsHash],
  });

  return useContractWrite(config);
}
