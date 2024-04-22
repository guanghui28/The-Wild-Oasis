import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate: deleteBooking, isLoading: isDeleteBooking } = useMutation({
        mutationFn: (bookingId) => deleteBookingApi(bookingId),
        onSuccess: () => {
            toast.success(`Booking was deleted successfully`);
            queryClient.invalidateQueries({ queryKey: ["booking"] });
        },
        onError: () => toast.error("There was an error while deleting booking"),
    });
    return { deleteBooking, isDeleteBooking };
}
