import { get } from "lodash";
import { api } from "@/app/services";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type typeUseDelete = {
  path: string;
  queryKey: string[];
  successText: string;
  onError?: (data: unknown) => void;
  onSuccess?: (data: unknown) => void;
};

const useDelete = ({
  queryKey,
  path = "",
  successText,
  onError = () => {},
  onSuccess = () => {},
}: typeUseDelete) => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`${path}?id=${id}`).then((response) => {
        return get(response, "data");
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, { pauseOnHover: false });
      }
      onError(error);
    },
    onSuccess: (successData) => {
      toast.success(successText, { pauseOnHover: false });

      queryClient.invalidateQueries({
        exact: true,
        queryKey: queryKey,
      });
      onSuccess(successData);
    },
  });
  return response;
};

export default useDelete;
