import { useState } from "react";
// import EventListPage from './eventlist/EventListPage';
// import EventDetailPage from './eventdetail/EventDetailPage';
import EventArtistWrapper from "./eventdetail/EventArtistWrapper";
import FormRouter from "./eventlist/FormRouter";

export default function EventWrapper() {
  const Ui = {
    EventListPage: "EventListPage",
    EventDetailPage: "EventDetailPage",
  };

  const [currentUi, setCurrentUi] = useState(Ui.EventListPage);
  const [event, setEvent] = useState(null);
  
  console.log("Wrapper", event)
  return (
    <>
      {currentUi === Ui.EventListPage && (
        <FormRouter
          next={() => setCurrentUi(Ui.EventDetailPage)}
          setEvent={setEvent}
        />
      )}
      {currentUi === Ui.EventDetailPage && (
        <EventArtistWrapper
          back={() => setCurrentUi(Ui.EventListPage)}
          event={event}
        />
      )}
    </>
  );
}
