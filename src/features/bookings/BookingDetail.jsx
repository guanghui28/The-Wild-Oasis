import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { MdLibraryAddCheck } from "react-icons/md";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiTrash } from "react-icons/hi";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleteBooking } = useDeleteBooking();

    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;
    if (!isLoading) return <Empty resourceName="booking" />;
    const { status, id: bookingId } = booking;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Modal>
                <ButtonGroup>
                    {status === "unconfirmed" && (
                        <Button
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check in
                        </Button>
                    )}
                    {status === "checked-in" && (
                        <Button
                            icon={<MdLibraryAddCheck />}
                            disabled={isCheckingOut}
                            onClick={() => checkout(bookingId)}
                        >
                            Check out
                        </Button>
                    )}
                    <Modal.Open opens="delete">
                        <Button variation="danger" icon={<HiTrash />}>
                            Delete
                        </Button>
                    </Modal.Open>

                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                </ButtonGroup>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName={`booking #${bookingId}`}
                        onConfirm={() => {
                            deleteBooking(bookingId);
                            navigate("/bookings");
                        }}
                        disabled={isDeleteBooking}
                    />
                </Modal.Window>
            </Modal>
        </>
    );
}

export default BookingDetail;
