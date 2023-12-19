import { Participants } from "@/components/Participants";
import { BaseLayout } from "@/components/layouts/BaseLayout";
// import { useReadAllParticipants } from "@/lib/services/queries/useReadAllParticipants";
// import { useReadNewConsensus } from "@/lib/services/queries/useReadNewConsensus";
// import { useReadRandomnessContract } from "@/lib/services/queries/useReadRandomnessContract";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ContractPage = () => {
  const router = useRouter();
  const [contract, setContract] = useState("");
  const [randSrc, setRandSrc] = useState("");

  useEffect(() => {
    setContract(String(router.query.peerGradingAddress));
    setRandSrc(String(router.query.commitRevealAddr));
  }, [router.query]);

  // const { data, refetch } = useReadRandomnessContract({contract: contractAddress});

  // const { data } = useReadNewConsensus({ contract: contractAddress });

  return (
    <div className="w-full h-screen bg-[##e7e8ea] text-[#444]">
      <div
        className="
      max-w-[1600px] m-auto
      flex flex-col  mt-4"
      >
        <h1 className="text-2xl font-bold">
          Peer Grading ontract at {contract}{" "}
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

        <h2> consensus reached</h2> */}
      </div>
    </div>
  );
};

ContractPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ContractPage;
