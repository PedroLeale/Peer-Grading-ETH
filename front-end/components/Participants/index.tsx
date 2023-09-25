import { GET_ALL_PARTICIPANTS } from "@/lib/services/apollo/queries/AllParticipants";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

export const Participants = () => {
  const router = useRouter();

  const { data } = useQuery(GET_ALL_PARTICIPANTS, {
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
      <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
        {data?.addedParticipants &&
          data.addedParticipants.map((item) => (
            <span
              onClick={() => {
                router.push(
                  `https://mumbai.polygonscan.com/address/${item.participant}`
                );
              }}
              key={item.id}
              className="flex text-left text-blue-500 underline cursor-pointer mb-2 p-2 rounded border border-blue-500 hover:bg-blue-100"
            >
              {item.participant}
            </span>
          ))}
      </div>
    </div>
  );
};
