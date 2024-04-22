import styled from "styled-components";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();
    const { booking, isLoading } = useBooking();
    const [confirmed, setConfirmed] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { checkin, isCheckingIn } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    useEffect(() => {
        setConfirmed(booking?.isPaid ?? false);
    }, [booking]);

    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const optionalBreakfast = numNights * numGuests * settings.breakfastPrice;

    function handleCheckin() {
        if (!confirmed) return;
        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    extrasPrice: optionalBreakfast,
                    totalPrice: totalPrice + optionalBreakfast,
                    hasBreakfast: true,
                },
            });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            {!hasBreakfast && (
                <Box>
                    <CheckBox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmed(false);
                        }}
                    >
                        Do you want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfast)}?
                    </CheckBox>
                </Box>
            )}

            <Box>
                <CheckBox
                    checked={confirmed}
                    onChange={() => setConfirmed((confirmed) => !confirmed)}
                    disabled={isCheckingIn}
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {addBreakfast
                        ? `${formatCurrency(
                              optionalBreakfast + totalPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfast
                          )})`
                        : formatCurrency(totalPrice)}
                </CheckBox>
            </Box>
            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmed || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button
                    variation="secondary"
                    onClick={moveBack}
                    disabled={isCheckingIn}
                >
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
