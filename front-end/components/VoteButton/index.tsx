import React, { useEffect, useState } from "react";
import { useVote } from "@/lib/wagmi/useVote";
import { useDisclosure, Button } from "@chakra-ui/react";
import { BaseModal } from "../BaseModal";
import { useRouter } from "next/router";
import { GET_VOTES } from "@/lib/services/apollo/queries/getVotes";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

export const VoteButton = () => {
  const [contract, setContract] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  // const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setContract(String(router.query.peerGradingAddress));
  }, [router.query]);

  const { data: votesData } = useQuery(GET_VOTES, {
    variables: {
      contract: String(contract),
      skip: 0,
      first: 10,
    },
  });

  const { writeAsync } = useVote({ PeerGradingAddress: contract });
  const onVote = async () => {
    console.log("Vote confirmed");
    await writeAsync?.();
    onClose();
  };

  useEffect(() => {
    console.log(
      votesData?.voteds.every(
        (v) => v.participant.toLowerCase() !== address?.toLocaleLowerCase()
      )
    );
  }, [votesData]);

  return (
    <div className="text-left p-4 bg-white rounded-lg w-1/2">
      {/* TODO: show button only when user hasn't voted yet */}
      {true && (
        <button
          className="bg-[#0096FF] text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={onOpen}
        >
          Vote on this consensus
        </button>
      )}
      <BaseModal title="Vote" isOpen={isOpen} onClose={onClose}>
        <div>
          {" "}
          <Button onClick={onVote}>Confirm Vote</Button>
        </div>
      </BaseModal>
    </div>
  );
};
