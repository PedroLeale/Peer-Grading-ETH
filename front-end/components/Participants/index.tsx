import { GET_ALL_PARTICIPANTS } from "@/lib/services/apollo/queries/AllParticipants";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_AND_REVEALS } from "@/lib/services/apollo/queries/AllVotes";

export const Participants = () => {
  const router = useRouter();

  const { data } = useQuery(GET_ALL_PARTICIPANTS, {
    variables: {
      address: String(router.query.contractAddress),
      first: 10,
      skip: 0,
    },
  });

  const { data: randomnessData } = useQuery(GET_ALL_COMMITS_AND_REVEALS, {
    variables: {
      address: String(router.query.contractAddress),
      first: 10,
      skip: 0,
    },
  });

  return (
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      <span className="text-xl font-bold mb-2 block">
        participant&#39;s addresses:
      </span>
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
              {randomnessData?.commits.some(
                (commit) => commit.sender === item.participant
              ) ? (
                <span className="text-[#008000]">Commited</span>
              ) : (
                <span className="text-[#808080]">Waiting for commit</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
