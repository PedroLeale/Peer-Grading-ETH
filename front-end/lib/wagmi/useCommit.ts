import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/RandomnessSource.json";

interface Args {
  randSrc: string;
  _commit: string;
}

export function useCommit({ randSrc, _commit }: Args) {
  const { config } = usePrepareContractWrite({
    address: randSrc as `0x${string}`,
    abi,
    functionName: "commit",
    args: [_commit],
  });

  return useContractWrite(config);
}
