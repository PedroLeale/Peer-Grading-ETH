import { FileUploader } from "@/components/FileUploader";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useState, type ReactNode } from "react";
import "react-quill/dist/quill.snow.css";

const CreatePage = () => {
  const [cid, setCid] = useState("");

  return (
    <div className=" p-2 w-1/3 justify-center  flex flex-col  items-left rounded-md   bg-[##e7e8ea] text-[#444]">
      <h1 className="text-2xl font-bold mb-4">Create a peer review</h1>

      <p className="mb-4">
        First, add each participant and their respective report. These will be
        uploaded to IPFS, and each report will be linked to the participant by
        their address.
      </p>
      <FileUploader setCid={setCid} />
    </div>
  );
};

CreatePage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default CreatePage;
