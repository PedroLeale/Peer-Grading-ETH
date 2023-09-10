import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useSigner } from "wagmi";
import { ethers, type Signer } from "ethers";
import abi from "@/abi/PeerGrading.json";

type IGetSharesProps = {
  signer?: Signer | null;
  contract?: string;
};

const getRandomnessData = async ({ contract, signer }: IGetSharesProps) => {
  if (!contract || !signer) {
    console.log("aqui getRandomnessData");
    return "0.0";
  }
  const RdContract = new ethers.Contract(contract, abi, signer);

  console.log("aquii");
  console.log("aqui", p);

  return p;
};

const onError = (e: any) => {
  console.log(e);
};

type Props = {
  contract?: string;
};

const useReadRandomnessContract = ({ contract }: Props) => {
  const { data: signer } = useSigner();

  console.log({ signer, contract });

  return useQuery(
    [QueryKeys.READ_RANDOMNESS, contract],
    async () => {
      await getRandomnessData({
        signer,
        contract,
      });
    },
    {
      onError,
      enabled: !!(signer && contract),
    }
  );
};

export { getRandomnessData, useReadRandomnessContract };
