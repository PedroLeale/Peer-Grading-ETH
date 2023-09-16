import { BaseLayout } from "@/components/layouts/BaseLayout";
import { type ReactNode } from "react";
import "react-quill/dist/quill.snow.css";

const CreatePage = () => {
  return (
    <div className="w-full h-screen bg-[##e7e8ea] text-[#444]">
      <span> test</span>
    </div>
  );
};

CreatePage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default CreatePage;
