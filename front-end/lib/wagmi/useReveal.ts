import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/RandomnessSource.json";
import { ethers } from "ethers";

interface Args {
  randSrc: string;
  randNumb: number;
}

export function useReveal({ randSrc, randNumb }: Args) {
  const { config } = usePrepareContractWrite({
    address: randSrc as `0x${string}`,
    abi,
    functionName: "reveal",
    args: [ethers.utils.defaultAbiCoder.encode(["uint256"], [randNumb])],
  });

  return useContractWrite(config);
}
