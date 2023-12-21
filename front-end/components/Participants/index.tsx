import { GET_ALL_PARTICIPANTS } from "@/lib/services/apollo/queries/AllParticipants";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_AND_REVEALS } from "@/lib/services/apollo/queries/AllVotes";
import { CommitButton } from "../CommitButton";
import { RevealButton } from "../RevealButton";
import { useAccount } from "wagmi";
import { GET_SINGLE_PG_CONTRACT } from "@/lib/services/apollo/queries/SinglePgContract";
import { GET_CONSENSUSES } from "@/lib/services/apollo/queries/GetConsensuses";
import { ethers } from "ethers";
import { ReceniveConsensusButton } from "../ReceiveConsensusButton";

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

  const { data: consensusData } = useQuery(GET_CONSENSUSES, {
    variables: {
      contract: String(contract),
      skip: 0,
      first: 10,
    },
  });

  return (
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      <span className="text-xl font-bold mb-2 block">participants:</span>
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

      {data?.addedParticipants.length === commitData?.revealeds.length && (
        <ReceniveConsensusButton contract={contract}></ReceniveConsensusButton>
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        {consensusData?.consensuses.map((consensus: any, index: number) => (
          <p key={index} className="text-gray-700 text-lg font-bold">
            Consensus array:
            {consensusData?.consensuses.length === 0 ? (
              <span className="text-red">Empty</span>
            ) : (
              consensus.vector
            )}
          </p>
        ))}
      </div>
    </div>
  );
};
