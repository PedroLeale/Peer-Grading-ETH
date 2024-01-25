import React, { useEffect, useState } from "react";
import { useVote } from "@/lib/wagmi/useVote";
import { useDisclosure, Button } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import { useRouter } from "next/router";

export const VoteButton = () => {
  const [contract, setContract] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  useEffect(() => {
    setContract(String(router.query.peerGradingAddress));
  }, [router.query]);

  const { writeAsync } = useVote({ PeerGradingAddress: contract });
  const onVote = async () => {
    console.log("Vote confirmed");
    await writeAsync?.();
    onClose();
  };

  return (
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
