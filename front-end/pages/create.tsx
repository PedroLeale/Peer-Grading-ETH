import { BaseModal } from "@/components/BaseModal";
import { FileUploader } from "@/components/FileUploader";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useCreatePReview } from "@/lib/wagmi/useCreatePReview";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, type ReactNode, type FormEvent, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useWaitForTransaction } from "wagmi";

interface Uploader {
  fieldName: string;
  file: File | null;
}

const CreatePage = () => {
  const [cid, setCid] = useState("");
  const [workload, setWorkload] = useState<number>(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [uploaders, setUploaders] = useState<Uploader[]>([
    { fieldName: "", file: null },
  ]);

  const router = useRouter();

  const {
    writeAsync,
    data,
    error: createError,
    isError,
  } = useCreatePReview({
    ipfsHash: cid,
    participants: uploaders.map((up) => up.fieldName),
    workload,
  });

  const { data: transactionData } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    console.log("caiu aqui");
    if (createError) {
      toast.error(createError.message);
    }
  }, [createError, isError]);

  useEffect(() => {
    console.log("transaction data", transactionData);
    if (transactionData) {
      router.push(`/contract/${transactionData.logs[0].address}`);
    }
  }, [transactionData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    for (const uploader of uploaders) {
      if (!uploader.file || !uploader.fieldName) {
        alert("Both field name and file must be provided for all uploaders");
        return;
      }
      formData.append(uploader.fieldName, uploader.file);
    }
    if (cid !== "") {
      toast.warn("content already, deployed, attempting to create contract");
      try {
        console.log("deploying contract", cid);
        await writeAsync?.();
        toast.success("deployed contract");
      } catch (e: any) {
        toast.error(e.message);
      }
      return;
    }

    try {
      const response = await fetch("/api/store", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Server Response:", data);
      setCid(data.cid);
      toast.success("files successfully uploaded!");
    } catch (error) {
      toast.error("error uploading files");

      console.error("There was an error uploading the files:", error);
    }
  };

  return (
    <div className="p-2 mt-8 m-auto w-1/2 justify-center  flex flex-col  items-left rounded-md  bg-[##e7e8ea] text-[#444] rounded border border-4 border-emerald-600">
      <h1 className="text-2xl font-bold mb-4">Create a peer review</h1>
      <p className="mb-4">
        First, add each participant and their respective report. These will be
        uploaded to IPFS, and each report will be linked to the participant by
        their address.
      </p>

      <span className="font-bold text-2xl">
        How many reviews will each participant be assigned?
      </span>
      <input
        placeholder="insert value here"
        type="text"
        className="border p-2 rounded"
        onChange={(e) => {
          setWorkload(Number(e.target.value));
        }}
        value={workload}
        required
      />

      <FileUploader
        uploaders={uploaders}
        setUploaders={setUploaders}
        setCid={setCid}
        handleSubmit={handleSubmit}
      />

      <button
        className="bg-pg-primary py-2 px-4 font-bold w-1/2 mt-3"
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
          onOpen();
        }}
      >
        {/* TODO: mostrar erros de endereço inválido */}
        {/* TODO: mostrar uma caixa com todos os carregamentos. Primeiro o que envia para o IPFS e depois o que envia para a rede */}
        {/* TODO: corrigir redirect de página, para redirecionar corretamente após criação do contrato */}
        Create contract
      </button>

      <BaseModal title="create peer grading" isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col items-center">
          <span>
            {cid === "" ? `Deploying to IPFS...` : `Deployed to IPFS`}
          </span>

          <p className="text-sm mt-3 mb-3 text-center">
            Once the details of the contract are deployed to ipfs, press deploy
            contract below
          </p>

          <Button colorScheme="blue" onClick={async () => await writeAsync?.()}>
            {" "}
            deploy contract
          </Button>
        </div>
      </BaseModal>
    </div>
  );
};

CreatePage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default CreatePage;
