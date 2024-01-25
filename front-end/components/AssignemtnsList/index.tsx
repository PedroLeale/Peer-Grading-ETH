import { useAccount, useContractRead } from "wagmi";
import abi from "@/abi/PeerGrading.json";

interface IAssignemtnsList {
  contract: string;
}

export const AssignmentList = ({ contract }: IAssignemtnsList) => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: contract as `0x${string}`,
    abi,
    functionName: "distributeAssignments",
    args: [address],
    select: (data) => String(data),
  });

  return (
    <div className="w-1/3 mb-4">
      {data ? (
        <span className="mt-4 p-4 font-bold border-2 border-blue-500 rounded">
          {/* TODO: only show assignemtns after all users revealed */}
          Your assignments: {data}
        </span>
      ) : (
        <span className="mt-4 p-4 font-bold border-2 border-red-500 rounded">
          Your wallet is not part of the consensus, and therefore does not have
          any distributed assignments. Please select the correct wallet.
        </span>
      )}
    </div>
  );
};
