import { useState } from "react";
import React from "react";
import ArtistList from "./ArtistList";
import ArtistDetailPage from "./ArtistDetailPage";

const UI = {
    ArtistDetailPage: 'ArtistDetailPage', 
    ArtistList: 'ArtistList' 
};
const ArtistWrapper = ({results}) => {
    const [ui, setUI] = useState(UI.ArtistList);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    
    const handleSelectArtist = (artistId) => {
        setSelectedArtistId(artistId);
        setUI(UI.ArtistDetailPage);
    };

    const artistBack = () => {
        setSelectedArtistId(null);
        setUI(UI.ArtistList);
    };
    

    return (
        <>
            {ui === UI.ArtistList && <ArtistList selectArtist={handleSelectArtist} results={results} />}
            {ui === UI.ArtistDetailPage && <ArtistDetailPage artistId={selectedArtistId} back={artistBack} />}
        </>
    );
}

export default ArtistWrapper;