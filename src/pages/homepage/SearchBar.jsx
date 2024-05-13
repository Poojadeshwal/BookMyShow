import React, { useState, useEffect } from 'react';
import { getArtist } from '../../services/artist/artist'
import ArtistWrapper from '../artists/ArtistWrapper';
import { getFunctions } from '../../services/movie/movies';
import WrapperMovies from '../movies/WrapperMovies';
import Carousels from './Carousels';
import ContentFile from './ContentFile';
import { TranslateFunction } from '../../utils/internalisation';
import { getFunction } from '../../services/events/events';
import EventWrapper from '../events/EventWrapper';

const SearchBar = ({ onSearch }) => {
   
    const [search, setSearch] = useState('');
    const labels = TranslateFunction("labels");
    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

    return (
        <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginRight: "70px" }}>
          <img src="assets\logos\logo.png" alt="Logo" style={{ width: 200, height: 60 }} />
        </div>
        <div style={{ width: "50%", textAlign: "center" }}>
        <input
        style={{width:"80%",textAlign:"center",height:"45px",marginLeft:"100px",outline:"none","border":"none",textIndent:"20px",backgroundColor:"rgba(237, 237, 237, 0.5)"}}
        fullWidth
        
            // type="text"
            placeholder={labels("Search for Movies Event Artist and Sports Activities")}
            value={search}
            onChange={handleChange}
        />
         </div>
        
        <div style={{
          flex: 0.6,
          minWidth: 0,
          display: 'flex',
          // backgroundColor: "GhostWhite",
          justifyContent: 'flex-end',
          alignItems: 'right',
          marginRight:"50px"

        }}
        >
        <div style={{marginRight:"30px" }}>{labels("Gift Cards")}</div>
        <div style={{marginRight:"30px" }}>{labels("Offers")}</div>
        <div style={{marginRight:"30px" }}>{labels("Corporates")}</div>
        </div>
      </div>
     
        </>
    );
};











const SearchApp = () => {
    // console.log("serach")
    const [list, setList] = useState(null);

    const [searchResultsMovies, setSearchResultsMovies] = useState([]);
    const [searchResultsArtist, setSearchResultsArtist] = useState([]);
    const [searchResultsEvents, setSearchResultsEvents] = useState([]);
    const search = (searchQuery) => {
        // console.log("querry", searchQuery);
        if (searchQuery.length > 1) {
            Promise.all([
                getArtist(),
                getFunctions(),
                getFunction()
                
            ]).then(([artists, movies, events]) => {
                const combinedData = [...movies, ...artists,...events];
                console.log("combinedData", artists, movies,events, combinedData)

                const filteredMovieResults = movies.filter((item) => {
                    if (item.movieId) {
                        if (item.movieName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return item;
                        }
                    }
                })
                setSearchResultsMovies(filteredMovieResults);
                const filteredArtistResult = artists.filter((item) => {
                    if (item.artistId) {
                        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return item;
                        }

                    }

                })
                setSearchResultsArtist(filteredArtistResult);

                const filteredEventsResults = events.filter((item) => {
                    if (item.eventId) {
                        if (item.eventName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return item;
                        }
                    }
                })
                setSearchResultsEvents(filteredEventsResults);



            })
        }
        else {
            setSearchResultsMovies([])
            setSearchResultsArtist([])
            setSearchResultsEvents([])
        }
    }
    // console.log("searchResultsArtist", searchResultsArtist)
    // console.log("searchResultsMovies", searchResultsMovies)
    // console.log("searchResultsEvents", searchResultsEvents)
    return (
        <div>
           
            <SearchBar onSearch={search} />
            <br></br>
            {((searchResultsMovies && searchResultsMovies.length > 0) || (searchResultsArtist && searchResultsArtist.length > 0)||(searchResultsEvents && searchResultsEvents.length > 0)) ? (
                <>
                
                    {searchResultsMovies.length > 0 && <WrapperMovies results={searchResultsMovies} />}
                    {searchResultsArtist.length > 0  && <ArtistWrapper results={searchResultsArtist} />}
                    {searchResultsEvents.length > 0 && <EventWrapper results={searchResultsEvents} />}
                </>
            ) : (
                <>
                     <Carousels/>
                    <WrapperMovies />
                    <ContentFile/>
                    <EventWrapper/>
                    
                 
                </>
            )
            }




        </div >
    );
};

export default SearchApp;
