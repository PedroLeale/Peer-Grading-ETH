import { FileUploader } from "@/components/FileUploader";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useState, type ReactNode, type FormEvent, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

interface Uploader {
  fieldName: string;
  file: File | null;
}

const CreatePage = () => {
  const [cid, setCid] = useState("");
  const [workload, setWorkload] = useState<number>();
  const [uploaders, setUploaders] = useState<Uploader[]>([
    { fieldName: "", file: null },
  ]);

  useEffect(() => {
    if (cid !== "") {
      console.log("cid", cid);
      console.log("aqui o contrato já pode ser chamado para fazer delploy");
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
    <div className=" p-2 w-1/3 justify-center  flex flex-col  items-left rounded-md   bg-[##e7e8ea] text-[#444]">
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
