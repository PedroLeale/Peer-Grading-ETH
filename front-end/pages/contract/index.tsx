import { Participants } from "@/components/Participants";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Consensus } from "@/components/Consensus";

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
    // TODO: indicate that the user
    <div className="w-full h-screen bg-[##e7e8ea] text-[#444]">
      <div
        className="
      max-w-[1600px] m-auto
      flex flex-col  mt-4"
      >
        <h1 className="text-2xl font-bold">
          Peer Grading contract at {contract}{" "}
        </h1>

        {/*         <span className="text-xl font-bold mb-2 block">
          The contract is still in the commit phase
        </span> */}

        {/* <h2>First the participants must commit to reach a valid consensus</h2> */}

        <div className="flex flex-row">
          <Participants contract={contract} randSrc={randSrc} />
        </div>

        {/*         <h2>Randomness seed validity: true</h2>

        <h2> actual consensus array</h2>

        <h2> penalties</h2>
        <h2>Randomness seed validity: true</h2>
        {/* TODO: create a consensusComponent
        that shows:
        1- current consensus array;
        2- current votes for consensus array;
        3- finalize consensus button if votes > len(participants)/2
      
        optional: show penalties
      */}

        <Consensus contract={contract} />
      </div>
    </div>
  );
};

ContractPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ContractPage;
