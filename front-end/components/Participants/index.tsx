import { GET_ALL_PARTICIPANTS } from "@/lib/services/apollo/queries/AllParticipants";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_AND_REVEALS } from "@/lib/services/apollo/queries/AllVotes";
import { CommitButton } from "../CommitButton";
import { useEffect } from "react";

interface IParticipant {
  contract: string;
  randSrc: string;
}

export const Participants = ({ contract, randSrc }: IParticipant) => {
  const router = useRouter();

  const { data } = useQuery(GET_ALL_PARTICIPANTS, {
    variables: {
      address: String(contract),
      first: 10,
      skip: 0,
    },
  });

  const { data: CommitData } = useQuery(GET_ALL_COMMITS_AND_REVEALS, {
    variables: {
      address: String(randSrc),
      first: 10,
      skip: 0,
    },
  });

  useEffect(() => {
    console.log("commid data", { CommitData });
  }, [CommitData]);

  // let consensusState: boolean = false;

  // if (data?.addedParticipants.length === data?.randomnessData?.commits.length) {
  //   consensusState = true;
  // }

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
              {CommitData?.commits.some(
                (commit: { sender: any }) => commit.sender === item.participant
              ) ? (
                <span className="text-[#008000]">Commited</span>
              ) : (
                <span className="text-[#808080]">Waiting for commit</span>
              )}
              {/* {consensusState ? (
                <div className="text-[#008000]">Consensus reached!</div>
              ) : (
                <div className="text-[#008000]">Consensus not reached.</div>
              )}
              {CommitData?.reveals.some(
                (reveal: { sender: any }) => reveal.sender === item.participant
              ) ? (
                <span className="text-[#008000]">Revealed</span>
              ) : (
                <span className="text-[#808080]">Waiting for reveal</span>
              )} */}
            </div>
          ))}
      </div>
      {data?.addedParticipants && (
        <CommitButton
          randSrc={randSrc}
          addedParticipants={data?.addedParticipants}
        ></CommitButton>
      )}
    </div>
  );
};
