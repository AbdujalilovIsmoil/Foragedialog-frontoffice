import { get } from "lodash";
import { api } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

type typeUseGet = {
  path: string;
  queryKey: string;
};

const useGet = ({ path = "/", queryKey }: typeUseGet) => {
  const data = useQuery({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 6, // 6 daqiqa
    queryFn: () =>
      api
        .get(path, {
          headers: {
            "Accept-Encoding": "gzip", // Shu yerda gzip header qo'shildi
          },
        })
        .then((response) => get(response, "data.content")),
  });

  return data;
};

export default useGet;
