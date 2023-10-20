import { type AddedParticipant } from "@/lib/services/apollo/queries/AllParticipants";
import { useAccoun } from "wagmi";

import abi from "@/abi/RandomnessSource.json";
import { useEffect } from "react";
import { useCommit } from "@/lib/wagmi/useCommit";

interface IVotedButton {
  addedParticipants: AddedParticipant[];
  randSrc: string;
}

export const CommitButton = ({ addedParticipants, randSrc }: IVotedButton) => {
  const { address } = useAccount();
  console.log({ randSrc, abi });

  const { write, error } = useCommit({ randSrc, _commit: "asaofsdaifj" });

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  if (
    addedParticipants
      .map((ap) => ap.participant)
      .includes(String(address?.toLocaleLowerCase()))
  )
    return (
      <div className="text-left p-4 bg-white rounded-lg w-1/2">
        <button
          className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            write?.();
          }}
          disabled={!write}
        >
          commit
        </button>
      </div>
    );
  else return <div></div>;
};
