import { useMutation } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

interface Params {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  // transactionHa
}

interface Response {
  ipfsHash: string;
}

const createPlace = async (params: Params): Promise<Response> => {
  try {
    const res = await axios.post<Response>(
      "/api/create-case",
      { ...params },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    toast(`error: ${String(err.message)}`, { type: "error" });
    throw err;
  }
};

const useCreatePlace = () => {
  return useMutation(
    [QueryKeys.CREATE_PLACE],
    createPlace,

    {
      onSuccess: (data) => {
        if (!data) return;
        toast("token created", { type: "success" });
        Router.push(`places`);
      },
    }
  );
};

export { useCreatePlace, createPlace };
