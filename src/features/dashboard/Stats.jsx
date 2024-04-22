import Stat from "./Stat";
import { BsSuitcaseLg } from "react-icons/bs";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // 1.
    const numBookings = bookings.length;
    // 2.
    const sales = bookings.reduce((acc, el) => acc + el.totalPrice, 0);
    // 3.
    const checkins = confirmedStays.length;
    // 4.
    const occupancy =
        confirmedStays.reduce((acc, el) => acc + el.numNights, 0) /
        (numDays * cabinCount);
    return (
        <>
            <Stat
                icon={<BsSuitcaseLg />}
                title="Bookings"
                value={numBookings}
                color="blue"
            />
            <Stat
                icon={<LiaMoneyBillWaveSolid />}
                title="Sales"
                value={formatCurrency(sales)}
                color="green"
            />
            <Stat
                icon={<MdOutlineCalendarToday />}
                title="Checked-in"
                value={checkins}
                color="indigo"
            />
            <Stat
                icon={<IoBarChartOutline />}
                title="Occupancy rate"
                value={Math.round(occupancy * 100) + "%"}
                color="yellow"
            />
        </>
    );
}

export default Stats;
