import { useState } from "react";
import EventDetailPage from "./EventDetailPage";
import ArtistDetailPage from "../../artists/ArtistDetailPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UI = {
  ArtistDetailPage: "ArtistDetailPage",
  EventDetailPage: "EventDetailPage", 
};
const EventArtistWrapper = ({ back, event }) => {
  // console.log(event, "checkit")
  const [ui, setUI] = useState(UI.EventDetailPage);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  let handleSelectArtist = (artistId) => {
    setSelectedArtistId(artistId);
    setUI(UI.ArtistDetailPage);
  };

  const artistBack = () => {
    setSelectedArtistId(null);
    setUI(UI.EventDetailPage);
  };
  
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

   let eventId = null;
  if(params.eventId){
    eventId = params.eventId;
    console.log(eventId, "eventId")
    back=()=>{
      let url = (location.state?.from?.pathname+location.state?.from?.search||'') || "/events"
      navigate(url)
    }
    handleSelectArtist=artistId=> navigate(`/artist/${artistId}`, {state:{from: location}})
  }

  return (
    <>
      {ui === UI.EventDetailPage && (
        <EventDetailPage
          onSelectArtist={handleSelectArtist}
          back={back}
          event={event}
          eventId={eventId}

        />
      )}
      {ui === UI.ArtistDetailPage && (
        <ArtistDetailPage artistId={selectedArtistId} back={artistBack} />
      )}
    </>
  );
};

export default EventArtistWrapper;
