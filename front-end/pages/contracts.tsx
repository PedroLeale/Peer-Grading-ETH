import { BaseLayout } from "@/components/layouts/BaseLayout";
import type { ReactNode } from "react";
import { Contracts } from "@/components/Contracts";
import { useState } from "react";

interface PageWithLayout extends React.FC {
  getLayout?: (page: ReactNode) => ReactNode;
}

const ContractsPage: PageWithLayout = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  return (
    <div>
      <div className="py-2 px-4 max-w-3xl mx-auto mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Search for contract hash"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between w-1/2 m-auto">
        <button
          className={`px-4 py-2 border border-gray-300 rounded-md text-black ${
            page === 0 ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
          }`}
          onClick={() => {
            setPage((old) => Math.max(old - 1, 0));
          }}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md bg-green-500 hover:bg-green-700 text-black"
          onClick={() => {
            setPage((old) => old + 1);
          }}
        >
          Next Page
        </button>
      </div>
      <Contracts search={search} page={page} setPage={setPage} />
    </div>
  );
};

ContractsPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ContractsPage;
