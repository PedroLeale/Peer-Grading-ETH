import { useReadAllParticipants } from "@/lib/services/queries/useReadAllParticipants";
import { useRouter } from "next/router";

export const Participants = () => {
  const router = useRouter();

  const { data } = useReadAllParticipants({
    contract: String(router.query.contractAddress),
  });

  return (
    <div className="text-left">
      <span className="text-xl"> participantes presentes: </span>
      <div className="flex flex-col">
        {data?.map((l) => (
          <span className="flex text-left" key={l.signature}>
            {l.args?.participant}
          </span>
        ))}
      </div>
    </div>
  );
};
