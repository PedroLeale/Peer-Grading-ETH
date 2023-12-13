import { BaseLayout } from "@/components/layouts/BaseLayout";
import type { ReactNode } from "react";
import { Contracts } from "@/components/Contracts";
import { useState } from "react";

interface PageWithLayout extends React.FC {
  getLayout?: (page: ReactNode) => ReactNode;
}

const ContractsPage: PageWithLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="py-2 px-4 max-w-3xl mx-auto">
      <div className="mb-4">
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
      <Contracts search={search} />
    </div>
  );
};

ContractsPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ContractsPage;
