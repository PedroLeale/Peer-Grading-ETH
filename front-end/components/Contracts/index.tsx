import { GET_ALL_CONTRACTS } from "@/lib/services/apollo/queries/AllContracts";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const Contracts = () => {
  const [
    skip,
    // setSkip
  ] = useState(0);

  const {
    data,
    // error, loading
  } = useQuery(GET_ALL_CONTRACTS, {
    variables: {
      skip,
      first: 10,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      {data?.peerGradingDeployeds &&
        data.peerGradingDeployeds.map((item) => (
          <div key={item.id} className="bg-white p-4 m-2 rounded shadow-lg">
            <span className="block font-bold text-gray-900 text-lg">
              Peer grading at {item.peerGradingAddress}
            </span>
            <span className="block text-gray-700 text-sm mb-2">
              Randomness contract: {item.commitRevealAddr}
            </span>

            <span>
              Deployed at {new Date(item.blockTimestamp * 1000).toISOString()}
            </span>
          </div>
        ))}
    </div>
  );
};
