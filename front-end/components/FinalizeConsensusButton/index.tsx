import React, { useEffect, useState } from "react";
import { useFinalizeConsensus } from "@/lib/wagmi/useFinalizeConsensus";
import { useDisclosure, Button } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import { useRouter } from "next/router";

export const FinalizeConsensusButton = () => {
  const [contract, setContract] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  useEffect(() => {
    setContract(String(router.query.peerGradingAddress));
  }, [router.query]);

  const { writeAsync } = useFinalizeConsensus({ PeerGradingAddress: contract });
  const onVote = async () => {
    await writeAsync?.();
    onClose();
  };

  return (
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      <button
        className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={onOpen}
      >
        Finalize Consensus
      </button>
      <BaseModal title="Finalize" isOpen={isOpen} onClose={onClose}>
        <div>
          <Button onClick={onVote}>Confirm to finalize it</Button>
        </div>
      </BaseModal>
    </div>
  );
};
