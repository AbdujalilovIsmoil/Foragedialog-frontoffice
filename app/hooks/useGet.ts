import { get } from "lodash";
import { api } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

type typeUseGet = {
  path: string;
  queryKey: string;
  isLoading?: boolean;
};

const useGet = ({ path = "/", queryKey, isLoading = false }: typeUseGet) => {
  const data = useQuery({
    queryKey: [queryKey],
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 6,
    queryFn: () => api.get(path).then((response) => get(response, "data")),
  });

  return data;
};

export default useGet;
