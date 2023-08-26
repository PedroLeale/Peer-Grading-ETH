import { Navbar } from "@/components/Navbar";
import { useReadRandomnessContract } from "@/lib/services/queries/useReadRandomnessContract";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const Dashboard = () => {
  const router = useRouter();
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    setContractAddress(String(router.query.contractAddress));
  }, [router.query]);

  const { data } = useReadRandomnessContract({ contract: contractAddress });

  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      {" "}
      <Navbar />
      <div className="w-[1200px] flex flex-col items-center text-left  mt-4">
        <h1 className="text-4xl">Bem vindo ao helper do Peer Grading</h1>
        <h4 className="text-left"> seu contrato é {contractAddress}</h4>
      </div>
    </div>
  );
};

export default Dashboard;
