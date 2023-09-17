import { BaseLayout } from "@/components/layouts/BaseLayout";
import { type ReactNode } from "react";
import "react-quill/dist/quill.snow.css";

const CreatePage = () => {
  return (
    <div className="p-2 w-full flex flex-col  items-center shadow rounded-md  h-screen bg-[##e7e8ea] text-[#444]">
      <h1 className="text-2xl font-bold mb-4">Create a peer review</h1>

      <p className="mb-4">
        First, add each participant and their respective report. These will be
        uploaded to IPFS, and each report will be linked to the participant by
        their address.
      </p>
    </div>
  );
};

CreatePage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default CreatePage;
