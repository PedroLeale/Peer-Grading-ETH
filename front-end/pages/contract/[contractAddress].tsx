import { Navbar } from "@/components/Navbar";
import { Participants } from "@/components/Participants";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useReadAllParticipants } from "@/lib/services/queries/useReadAllParticipants";
import { useReadNewConsensus } from "@/lib/services/queries/useReadNewConsensus";
import { useReadRandomnessContract } from "@/lib/services/queries/useReadRandomnessContract";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ContractPage = () => {
  const router = useRouter();
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    setContractAddress(String(router.query.contractAddress));
  }, [router.query]);

  // const { data, refetch } = useReadRandomnessContract({contract: contractAddress});

  const { data } = useReadNewConsensus({ contract: contractAddress });

  return (
    <div className="w-full h-screen bg-[##e7e8ea] text-[#444]">
      <div
        className="
      max-w-[1200px] m-auto
      flex flex-col   mt-4"
      >
        <h1 className="text-4xl">Bem vindo ao helper do Peer Grading</h1>
        <h4 className="text-left"> seu contrato é {contractAddress}</h4>

        <Participants />

        <h2>Addresses that commited and revealed for randomness already</h2>

        <h2>Randomness seed validity: true</h2>

        <h2> actual consensus array</h2>

        <h2> penalties</h2>

        <h2> consensus reached</h2>
      </div>
    </div>
  );
};

ContractPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ContractPage;
