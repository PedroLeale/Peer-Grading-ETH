import { Explanation } from "@/components/Explanation";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { type ReactNode } from "react";

import { Contracts } from "@/components/Contracts";

function Home() {
  return (
    <div className=" w-1000 h-screen m-auto flex  flex-col ">
      <Explanation />

      <h1 className="p-2 text-2xl font-bold mb-4">Some example contracts</h1>

      <Contracts />
    </div>
  );
}
Home.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
