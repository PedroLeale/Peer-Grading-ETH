import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/PeerGrading.json";
// import { ethers } from "ethers";
// const abiCoder = ethers.utils.defaultAbiCoder;
interface Args {
  uintVector: string;
  contract: string;
}

export function useSendConsensus({ uintVector, contract }: Args) {
  const { config } = usePrepareContractWrite({
    address: contract as `0x${string}`,
    abi,
    functionName: "receiveConsensus",
    args: [uintVector.split(",").map((i) => Number(i))],
  });

  return useContractWrite(config);
}
