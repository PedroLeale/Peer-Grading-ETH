import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import { useAccount, useSigner } from "wagmi";
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

  const p = await RdContract.getParticipant(
    "0x6E10679Eaf9Cc4733274a0F85148F4126364C2b5"
  );

  console.log("aquii");
  console.log("aqui", p);

  return p;
};

const onError = (e: any) => {
  console.log(e);
};

type UseGetSharesProps = {
  contract?: string;
};

const useReadRandomnessContract = ({ contract }: UseGetSharesProps = {}) => {
  const { address: account } = useAccount();
  const { data: signer } = useSigner();

  console.log({ signer, contract });

  return useQuery(
    [QueryKeys.READ_RANDOMNESS, account],
    async () => {
      await getRandomnessData({
        signer,
        contract,
      });
    },
    {
      onError,
      enabled: !!account,
    }
  );
};

export { getRandomnessData, useReadRandomnessContract };
