import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { type Signer } from "ethers";
// import { useAccount } from "wagmi";
// import { ethers, type Signer } from "ethers";
// import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
  signer?: Signer | null;
  contract?: string;
};

const getRandomnessData = async ({ contract }: IGetSharesProps) => {
  if (!contract) {
    console.log("aqui getRandomnessData");
    return "0.0";
  }
  // const RdContract = new ethers.Contract(contract, abi, signer);

  console.log("aquii");
  // console.log("aqui", p);

  // return p;
};

const onError = (e: any) => {
  console.log(e);
};

type Props = {
  contract?: string;
};

const useReadRandomnessContract = ({ contract }: Props) => {
  console.log({ contract });

  return useQuery(
    [QueryKeys.READ_RANDOMNESS, contract],
    async () => {
      await getRandomnessData({
        contract,
      });
    },
    {
      onError,
      enabled: !!contract,
    }
  );
};

export { getRandomnessData, useReadRandomnessContract };
