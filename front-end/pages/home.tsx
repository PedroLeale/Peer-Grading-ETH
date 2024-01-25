import Link from "next/link";
import { Explanation } from "@/components/Explanation";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { type ReactNode } from "react";

function Home() {
  return (
    <div className=" w-1000 h-screen m-auto flex  flex-col ">
      <Explanation />

      <h1 className="p-2 text-2xl font-bold mb-4">
        <Link href="/contracts" className="text-blue-500 hover:underline">
          <span className="underline">Go to Contracts Page</span>
        </Link>
      </h1>
    </div>
  );
}
Home.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
