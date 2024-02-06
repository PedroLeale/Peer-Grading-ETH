import { Participants } from "@/components/Participants";
import { VoteButton } from "@/components/VoteButton";
import { FinalizeConsensusButton } from "@/components/FinalizeConsensusButton";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Consensus } from "@/components/Consensus";
import { AssignmentList } from "@/components/AssignemtnsList";

const ContractPage = () => {
  const router = useRouter();
  const [contract, setContract] = useState("");
  const [randSrc, setRandSrc] = useState("");

  useEffect(() => {
    setContract(String(router.query.peerGradingAddress));
    setRandSrc(String(router.query.commitRevealAddr));
  }, [router.query]);

  // const { data, refetch } = useReadRandomnessContract({contract: contractAddress});

  return (
    <div className="w-full h-screen bg-[##e7e8ea] text-[#444]">
      <div
        className="
      max-w-[1600px] m-auto
      flex flex-col  mt-4"
      >
        <h1 className="text-2xl font-bold">
          Peer Grading contract at {contract}{" "}
        </h1>

        <div className="flex flex-row">
          <Participants contract={contract} randSrc={randSrc} />
        </div>

        <AssignmentList contract={contract}></AssignmentList>

        <div className="flex flex-row w-1/2">
          <VoteButton />
          <FinalizeConsensusButton />
        </div>
        <div className="mt-3">
          <Consensus contract={contract} />
        </div>
      </div>
    </div>
  );
};

ContractPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ContractPage;
