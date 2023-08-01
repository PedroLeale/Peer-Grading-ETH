import { useContractWrite, usePrepareContractWrite } from "wagmi";
import HctAbi from "@/abi/Hct.json";

const contractAddress = "46eD7a1A676BdaD1404E18acc39d1701995EcF6c";

interface Args {
  to: string;
  uri: string;
}

export function useContractCreatePlace({ to, uri }: Args) {
  // TODO: remove this basic ruler later. It simply emits an event
  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: HctAbi,
    functionName: "safeMint",
    args: [to, uri],
  });

  return useContractWrite(config);
}
