import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/RandomnessSource.json";
import { ethers } from "ethers";

interface Args {
  randSrc: string;
  _commit: string;
}

export function useCommit({ randSrc, _commit }: Args) {
  const { config } = usePrepareContractWrite({
    address: randSrc as `0x${string}`,
    abi,
    functionName: "commit",
    args: [ethers.utils.formatBytes32String(_commit)],
  });

  return useContractWrite(config);
}
