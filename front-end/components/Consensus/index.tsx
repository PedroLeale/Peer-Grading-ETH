import { GET_CONSENSUSES } from "@/lib/services/apollo/queries/GetConsensuses";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import abi from "@/abi/PeerGrading.json";
import { GET_VOTES } from "@/lib/services/apollo/queries/getVotes";

interface IConsensus {
  contract: string;
}

export const Consensus = ({ contract }: IConsensus) => {
  const { address } = useAccount();

  const { data: consensusData } = useQuery(GET_CONSENSUSES, {
    variables: {
      contract: String(contract),
      skip: 0,
      first: 10,
    },
  });

  const { data: votesData } = useQuery(GET_VOTES, {
    variables: {
      contract: String(contract),
      skip: 0,
      first: 10,
    },
  });

  const { data } = useContractRead({
    address: contract as `0x${string}`,
    abi,
    functionName: "distributeAssignments",
    args: [address],
    select: (data) => String(data),
  });

  useEffect(() => {
    console.log({ data });
  }, [data]);

  useEffect(() => {
    console.log({ votesData, consensusData });
  }, [consensusData, votesData]);

  return (
    <div>
      {data ? (
        <span className="mt-4 p-4 font-bold border-2 border-blue-500 rounded">
          Your assignments here: {data}
        </span>
      ) : (
        <span className="mt-4 p-4 font-bold border-2 border-red-500 rounded">
          Your wallet is not part of the consensus, and therefore does not have
          any distributed assignments. Please select the correct wallet.
        </span>
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        {consensusData?.consensuses
          .slice()
          .sort((a, b) => Number(b.index) - Number(a.index)) // sorts the array by the 'index' property
          .map((consensus: any, index: number) => (
            <p key={index} className="text-gray-700 text-lg font-bold">
              Consensus array:{" "}
              {consensusData?.consensuses.length === 0 ? (
                <span className="text-red">Empty</span>
              ) : (
                consensus.vector.join(" ")
              )}
              <div>
                <span className="font-bold">
                  votes on this array:
                  <br />
                </span>

                {votesData &&
                  consensusData &&
                  votesData?.voteds
                    .filter((v) => v.consensusCounter === consensus.index)
                    .map((v, index) => (
                      <span key={index}>
                        {v.participant}
                        <br />
                      </span>
                    ))}
              </div>
            </p>
          ))}
      </div>
    </div>
  );
};
