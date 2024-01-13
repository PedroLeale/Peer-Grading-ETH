import { GET_ALL_PARTICIPANTS } from "@/lib/services/apollo/queries/AllParticipants";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_AND_REVEALS } from "@/lib/services/apollo/queries/AllVotes";
import { CommitButton } from "../CommitButton";
import { RevealButton } from "../RevealButton";
import { useAccount } from "wagmi";
import { GET_SINGLE_PG_CONTRACT } from "@/lib/services/apollo/queries/SinglePgContract";
import { ethers } from "ethers";
import { ReceiveConsensusButton } from "../ReceiveConsensusButton";

interface IParticipant {
  contract: string;
  randSrc: string;
}

export const Participants = ({ contract, randSrc }: IParticipant) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data } = useQuery(GET_ALL_PARTICIPANTS, {
    variables: {
      address: String(contract),
      first: 10,
      skip: 0,
    },
  });

  const { data: contractData } = useQuery(GET_SINGLE_PG_CONTRACT, {
    variables: {
      contract: String(contract),
      first: 10,
      skip: 0,
    },
  });

  const { data: commitData } = useQuery(GET_ALL_COMMITS_AND_REVEALS, {
    variables: {
      address: String(randSrc),
      first: 10,
      skip: 0,
    },
  });

  return (
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      {/* 
      <span className="text-xl font-bold mb-2 block">participants:</span>
      //TODO:
        Colocar colunas avisando o que é cada coisa. São 4 ao todo:
        1. Endereço; -- done
        2. status de revelado, ou commited; -- done
        3. arquivo; -- done
        4. Grading; -- falta a consulta
      */}
      <div className="flex flex-row justify-between font-bold mb-2">
        <span>Participants&apos; addresses</span>
      </div>
      <div className="flex flex-col bg-gray-100 rounded-lg">
        {data?.addedParticipants &&
          data.addedParticipants.map((item) => (
            <div
              key={item.id}
              className="flex text-left text-blue-500  cursor-pointer mb-2 p-2 rounded border border-blue-500 hover:bg-blue-100 justify-between"
            >
              <div>
                <span className="font-bold ">#{item.assignmentId} </span>
                <span
                  className="text-link-blue underline"
                  onClick={() => {
                    router.push(
                      `https://mumbai.polygonscan.com/address/${item.participant}`
                    );
                  }}
                >
                  {item.participant}
                </span>
              </div>
              <span className="font-bold mb-2">Status:</span>
              {commitData?.revealeds?.some(
                (reveal: { sender: any }) => reveal.sender === item.participant
              ) ? (
                <span className="text-[#008000]">Revealed</span>
              ) : commitData?.commits.some(
                  (commit: { sender: any }) =>
                    commit.sender === item.participant
                ) ? (
                <span className="text-[#008000]">Committed</span>
              ) : (
                <span className="text-[#808080]">waiting for commit</span>
              )}
              {/* 
              //TODO: arrumar o nodo de IPFS, para ele salvar e trazer os dados. (Precisa colocar o cartão no web3Storage)
              */}
              <a
                href={`ipfs://${
                  contractData?.peerGradings[0].ipfsHash ?? ""
                }/${ethers.utils.getAddress(item.participant)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-blue underline"
              >
                file
              </a>{" "}
            </div>
          ))}
      </div>

      {data?.addedParticipants &&
        address &&
        data?.addedParticipants.length !== commitData?.commits.length && (
          <CommitButton
            randSrc={randSrc}
            addedParticipants={data?.addedParticipants}
          ></CommitButton>
        )}

      {data?.addedParticipants &&
        address &&
        data?.addedParticipants.length === commitData?.commits.length &&
        !commitData.revealeds
          .map((item) => item.sender)
          .includes(address.toLowerCase()) && (
          <RevealButton
            randSrc={randSrc}
            addedParticipants={data?.addedParticipants}
          ></RevealButton>
        )}

      {data?.addedParticipants.length}

      {data?.addedParticipants.length === commitData?.revealeds.length && (
        <ReceiveConsensusButton contract={contract}></ReceiveConsensusButton>
      )}
    </div>
  );
};
