import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { type IPlace } from "@/types/place";

interface Params {
  page: number;
  limit: number;
}

interface GetRes {
  places: IPlace[];
}

const getPlaces = async (params: Params) => {
  const { data } = await axios.get<GetRes>(`/api/get-places/`, { params });
  return data.places;
};

const useGetPlaces = (props: Params) => {
  return useQuery(
    [QueryKeys.GET_PLACES],
    async () => await getPlaces(props),
    {}
  );
};

export { useGetPlaces, getPlaces };
