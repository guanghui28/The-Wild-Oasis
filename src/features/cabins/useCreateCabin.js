import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isCreating } = useMutation({
        mutationFn: createEditCabinApi,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { createCabin, isCreating };
}
