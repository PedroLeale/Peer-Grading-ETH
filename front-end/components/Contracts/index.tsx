import { GET_ALL_CONTRACTS } from "@/lib/services/apollo/queries/AllContracts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ContractsProps {
  search: string;
}

export const Contracts = ({ search }: ContractsProps) => {
  const [
    skip,
    // setSkip
  ] = useState(0);

  const router = useRouter();

  const {
    data,
    // error, loading
  } = useQuery(GET_ALL_CONTRACTS, {
    variables: {
      skip,
      first: 15,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container mx-8 p-4">
      {data?.peerGradingDeployeds &&
        data.peerGradingDeployeds
          .filter(({ peerGradingAddress }) =>
            peerGradingAddress.includes(search)
          )
          .map(
            ({ id, commitRevealAddr, peerGradingAddress, blockTimestamp }) => (
              <div
                onClick={() => {
                  router.push({
                    pathname: "/contract",
                    query: {
                      commitRevealAddr,
                      peerGradingAddress,
                    },
                  });
                }}
                key={id}
                className="bg-white p-4 m-2 rounded border border-gray-300 cursor-pointer"
              >
                <span className="block font-bold text-gray-900 text-lg">
                  Peer grading at {peerGradingAddress}
                </span>
                <span className="block text-gray-700 text-sm mb-2">
                  Randomness contract: {commitRevealAddr}
                </span>

                <span>
                  Deployed at {new Date(blockTimestamp * 1000).toISOString()}
                </span>
              </div>
            )
          )}
    </div>
  );
};
