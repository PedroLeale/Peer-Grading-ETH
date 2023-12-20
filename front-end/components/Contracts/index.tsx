import { GET_ALL_CONTRACTS } from "@/lib/services/apollo/queries/AllContracts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ContractsProps {
  search: string;
  page: number;
  setPage: (page: number) => void;
}

export const Contracts = ({ search, page, setPage }: ContractsProps) => {
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const totalItems = 15;

  const {
    data,
    // error, loading
  } = useQuery(GET_ALL_CONTRACTS, {
    variables: {
      skip: totalItems * page,
      first: totalItems,
    },
  });

  useEffect(() => {
    if (data?.peerGradingDeployeds.length === 0 && page > 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [data, page, setPage]);

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
      {!hasMore && (
        <span className="text-gray-500 text-lg font-bold mt-4">
          There is no more contracts
        </span>
      )}
    </div>
  );
};
