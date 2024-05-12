import React, { useState, useEffect } from 'react';
import { getArtist } from '../../services/artist/artist'
import ArtistWrapper from '../artists/ArtistWrapper';
import { getFunctions } from '../../services/movie/movies';
import WrapperMovies from '../movies/WrapperMovies';
import Carousels from './Carousels';
import ContentFile from './ContentFile';
import { TranslateFunction } from '../../utils/internalisation';

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
            placeholder="Search for Movies Event Artist and Sports Activities"
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
    console.log("seracg")
    const [list, setList] = useState(null);

    const [searchResultsMovies, setSearchResultsMovies] = useState([]);
    const [searchResultsArtist, setSearchResultsArtist] = useState([]);
    const search = (searchQuery) => {
        // console.log("querry", searchQuery);
        if (searchQuery.length > 1) {
            Promise.all([
                getArtist(),
                getFunctions(),
                
            ]).then(([artists, movies]) => {
                const combinedData = [...movies, ...artists];
                console.log("combinedData", artists, movies, combinedData)

                const filteredMovieResults = movies.filter((item) => {
                    if (item.movieId) {
                        console.log("if")
                        if (item.movieName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            console.log("mil gya")

                            return item;
                        }

                    }


                })
                setSearchResultsMovies(filteredMovieResults);
                const filteredArtistResult = artists.filter((item) => {
                    if (item.artistId) {
                        console.log("artist if")
                        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            console.log("mil gya")

                            return item;
                        }

                    }

                })
                setSearchResultsArtist(filteredArtistResult);





            })
        }
        else {
            setSearchResultsMovies([])
            setSearchResultsArtist([])
        }
    }
    console.log("searchResultsArtist", searchResultsArtist)
    console.log("searchResultsMovies", searchResultsMovies)
    return (
        <div>
           
            <SearchBar onSearch={search} />
            <br></br>
            {((searchResultsMovies && searchResultsMovies.length > 0) || (searchResultsArtist && searchResultsArtist.length > 0)) ? (
                <>
                    {searchResultsMovies.length > 0 && <WrapperMovies results={searchResultsMovies} />}
                    {searchResultsArtist.length > 0  && <ArtistWrapper results={searchResultsArtist} />}
                </>
            ) : (
                <>
                     <Carousels/>
                    <WrapperMovies />
                    <ContentFile/>
                    
                    {/* <EventWrapper/> */}
                </>
            )
            }




        </div >
    );
};

export default SearchApp;
