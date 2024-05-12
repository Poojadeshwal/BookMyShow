import { useState } from "react";
import BookingConfirmed from "./bookingConfirmation/BookingConfirmed";
import CreateBookingPage from "./bookingPage/CreateBookingPage";

const UI={
CreateBooking:"CreateBooking",
BookingConfirmed: "BookingConfirmed"
}

export default function BookingWrapper(){
    

    // const [updatedCount, setUpdatedCount] = useState(0);
    const [bookingData, setBookingData] = useState(null);
    const [ui, setUi] = useState(UI.CreateBooking)

    return(
        <>
       {ui===UI.CreateBooking && <CreateBookingPage setBookingData={setBookingData} next={() => setUi(UI.BookingConfirmed)} />}
        {bookingData && <BookingConfirmed  bookingData={bookingData} />}
        </>
    )
  
}