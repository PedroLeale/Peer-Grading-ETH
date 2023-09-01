import { useReadAllParticipants } from "@/lib/services/queries/useReadAllParticipants";
import { useRouter } from "next/router";

export const Participants = () => {
  const router = useRouter();

  const { data } = useReadAllParticipants({
    contract: String(router.query.contractAddress),
  });

  return (
    <div>
      <span> aqui</span>
    </div>
  );
};
