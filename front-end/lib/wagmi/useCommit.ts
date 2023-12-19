import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "@/abi/RandomnessSource.json";
import { ethers } from "ethers";
const abiCoder = ethers.utils.defaultAbiCoder;
interface Args {
  randSrc: string;
  randNumb: number;
  _adress: `0x${string}` | undefined;
}

export function useCommit({ randSrc, randNumb, _adress }: Args) {
  if (!_adress) {
    // Return null or a dummy function
    return {
      write: () => {
        console.log("Address is undefined");
      },
    };
  }

  const { config } = usePrepareContractWrite({
    address: randSrc as `0x${string}`,
    abi,
    functionName: "commit",
    args: [
      ethers.utils.keccak256(
        abiCoder.encode(["address", "uint256"], [_adress, randNumb])
      ),
    ],
  });

  return useContractWrite(config);
}
