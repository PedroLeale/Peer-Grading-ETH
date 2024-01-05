import { GET_CONSENSUSES } from "@/lib/services/apollo/queries/GetConsensuses";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import abi from "@/abi/PeerGrading.json";

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

  return (
    <div>
      {/* //TODO: avisar que a carteira não faz parte das cartieras do consenso,
      // então não tem distributed assignmetns nela. Ou seja, pedir para o usuário
      // selecionar a carteira correta. 
      */}
      <span> Your assignments here: {data}</span>

      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        {consensusData?.consensuses.map((consensus: any, index: number) => (
          <p key={index} className="text-gray-700 text-lg font-bold">
            Consensus array:{" "}
            {consensusData?.consensuses.length === 0 ? (
              <span className="text-red">Empty</span>
            ) : (
              consensus.vector.join(" ")
            )}
          </p>
        ))}
      </div>
    </div>
  );
};
