import { type AddedParticipant } from "@/lib/services/apollo/queries/AllParticipants";
import { useAccount } from "wagmi";

import abi from "@/abi/RandomnessSource.json";
import { useEffect } from "react";
import { useCommit } from "@/lib/wagmi/useCommit";
import { useDisclosure } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";

interface IVotedButton {
  addedParticipants: AddedParticipant[];
  randSrc: string;
}

export const CommitButton = ({ addedParticipants, randSrc }: IVotedButton) => {
  const { address } = useAccount();
  console.log({ randSrc, abi });

  const { /* write */ error } = useCommit({ randSrc, _commit: "asaofsdaifj" });
  const { onClose, onOpen, isOpen } = useDisclosure();

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
            onOpen();
          }}
          // disabled={!write}
        >
          commit
        </button>

        <BaseModal title="teste" isOpen={isOpen} onClose={onClose}>
          {/* TODO: 
          Colocar um input, uma checkbox para salvar nos cookies,
          // e o botão final para fazer o commit
           
          
          */}
          <p> teste</p>
        </BaseModal>
      </div>
    );
  else return <div></div>;
};
