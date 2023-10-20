import { type AddedParticipant } from "@/lib/services/apollo/queries/AllParticipants";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import RandAbi from "@/abi/RandomnessSource.json";
import { useEffect } from "react";

interface IVotedButton {
  addedParticipants: AddedParticipant[];
  randSrc: string;
}

export const CommitButton = ({ addedParticipants, randSrc }: IVotedButton) => {
  const { address } = useAccount();
  console.log(RandAbi);

  const { config, error } = usePrepareContractWrite({
    address: randSrc as `0x${string}`,
    abi: RandAbi,
    functionName: "commit",
  });

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  const { write } = useContractWrite(config);

  if (
    addedParticipants
      .map((ap) => ap.participant)
      .includes(String(address?.toLocaleLowerCase()))
  )
    return (
      <div className="text-left p-4 bg-white rounded-lg w-1/2">
        <button
          className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => write?.()}
          disabled={!write}
        >
          commit
        </button>
      </div>
    );
  else return <div></div>;
};
