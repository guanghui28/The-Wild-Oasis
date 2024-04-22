import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) =>
            createEditCabinApi(newCabinData, id),
        onSuccess: () => {
            toast.success("Update cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return {
        editCabin,
        isEditing,
    };
}
