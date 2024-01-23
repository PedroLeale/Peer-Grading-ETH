import { useAccount } from "wagmi";
import { type AddedParticipant } from "@/lib/services/apollo/queries/AllParticipants";
import React from "react";
import { useVote } from "@/lib/wagmi/useVote";
import { useDisclosure, Button } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";

export const VoteButton = () => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onVote = () => {
    // Here you can add the logic to handle the vote using the PeerGrading.json ABI
    console.log("Vote confirmed");
    useVote();
    onClose();
  };
  return (
    // make a button that opens a modal, with another button inside the modal
    // that when clicked, calls the onVote function
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      <button
        className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={onOpen}
      >
        Vote on this consensus
      </button>
      <BaseModal title="Vote" isOpen={isOpen} onClose={onClose}>
        <div>
          <Button onClick={onVote}>Confirm Vote</Button>
        </div>
      </BaseModal>
    </div>
  );
};
