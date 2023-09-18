import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { ethers } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
  contractAddress?: string;
};

const getVoted = async ({ contractAddress }: IGetSharesProps) => {
  if (!contractAddress) {
    console.log("error in getVoted");
    return "0.0";
  }

  const contract = new ethers.Contract(contractAddress, abi);
  const provider = new ethers.providers.JsonRpcProvider(
    String(process.env.NEXT_PUBLIC_RPC_URL)
  );

  const filter = contract.filters.Voted();

  // Fetch the logs
  const logs = await provider.getLogs(filter);

  // Parse the logs to get the event data
  const events = logs.map((log) => contract.interface.parseLog(log));

  return events;
};

const onError = (e: any) => {
  console.log(e);
};

type UseGetSharesProps = {
  contract?: string;
};

const useReadVoted = ({ contract }: UseGetSharesProps = {}) => {
  return useQuery(
    [QueryKeys.GET_PARTICIPANTS, contract],
    async () => {
      await getVoted({
        contractAddress: contract,
      });
    },
    {
      onError,
      enabled: !!contract,
    }
  );
};

export { getVoted, useReadVoted };
