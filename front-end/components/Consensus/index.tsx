import { GET_CONSENSUSES } from "@/lib/services/apollo/queries/GetConsensuses";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_VOTES } from "@/lib/services/apollo/queries/getVotes";

interface IConsensus {
  contract: string;
}

export const Consensus = ({ contract }: IConsensus) => {
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

  useEffect(() => {
    console.log({ votesData, consensusData });
  }, [consensusData, votesData]);

  return (
    <div>
      <h4 className="mt-4">
        the consesus on top of the list is the most recent:
      </h4>
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
