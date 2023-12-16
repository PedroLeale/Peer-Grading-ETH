import { GET_ALL_PARTICIPANTS } from "@/lib/services/apollo/queries/AllParticipants";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_AND_REVEALS } from "@/lib/services/apollo/queries/AllVotes";
import { CommitButton } from "../CommitButton";
import { useEffect, useState } from "react";
import { RevealButton } from "../RevealButton";
import { useAccount } from "wagmi";

interface IParticipant {
  contract: string;
  randSrc: string;
}

export const Participants = ({ contract, randSrc }: IParticipant) => {
  const router = useRouter();
  const { address } = useAccount();

  const [allCommited, setAllCommited] = useState(false);

  const { data } = useQuery(GET_ALL_PARTICIPANTS, {
    variables: {
      address: String(contract),
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

  useEffect(() => {
    if (data === undefined || commitData === undefined) return;

    if (data?.addedParticipants.length === commitData?.commits.length) {
      console.log({ data, commitData });
      console.log("chmoU");
      setAllCommited(true);
    }
  }, [commitData, data]);

  // let consensusState: boolean = false;

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
              {commitData?.commits.some(
                (commit: { sender: any }) => commit.sender === item.participant
              ) ? (
                <span className="text-[#008000]">Committed</span>
              ) : commitData?.revealeds?.some(
                  (reveal: { sender: any }) =>
                    reveal.sender === item.participant
                ) ? (
                <span className="text-[#008000]">Revealed</span>
              ) : (
                <span className="text-[#808080]">
                  Waiting for commit/reveal
                </span>
              )}
            </div>
          ))}
      </div>

      {/* TODO: Testar e corrigir para ver se o botão de commit só aparece quando ainda é possível o usuário fazer commit
      e quando o usuário faz parte dos added participants
      */}

      {data?.addedParticipants && (
        <CommitButton
          randSrc={randSrc}
          addedParticipants={data?.addedParticipants}
        ></CommitButton>
      )}

      {/* TODO: Testar e corrigir para ver se o botão de reveal só aparece quando é permitido revelar  */}
      {data?.addedParticipants &&
        data?.addedParticipants.length === commitData?.commits.length && (
          <RevealButton
            randSrc={randSrc}
            addedParticipants={data?.addedParticipants}
          ></RevealButton>
        )}
    </div>
  );
};
