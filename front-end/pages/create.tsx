import { FileUploader } from "@/components/FileUploader";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useCreatePReview } from "@/lib/wagmi/useCreatePReview";
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
  const [uploaders, setUploaders] = useState<Uploader[]>([
    { fieldName: "", file: null },
  ]);

  const router = useRouter();

  const { write, data } = useCreatePReview({
    ipfsHash: cid,
    participants: uploaders.map((up) => up.fieldName),
    workload,
  });

  const { data: transactionData } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    console.log("transaction data", transactionData);
    if (transactionData) {
      router.push(`/contract/${transactionData.logs[0].address}`);
    }
  }, [transactionData]);

  useEffect(() => {
    if (cid !== "") {
      try {
        console.log("cid", cid);
        write?.();
        toast.success("deployed contract");
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  }, [cid]);

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

    try {
      if (cid !== "") {
        console.log("cid not null, deploying");
        write?.();
        return;
      }
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
    <div className=" p-2 m-auto w-1/2 justify-center  flex flex-col  items-left rounded-md   bg-[##e7e8ea] text-[#444]">
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
    </div>
  );
};

CreatePage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default CreatePage;
