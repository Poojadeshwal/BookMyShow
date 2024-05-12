

import { useState } from "react";
import MovieListPage from "./movielist/MovieListPage";
// import MovieDetailPage from "./moviedetails/MovieDetailPage";
import MovieArtistDetailWrapper from "./moviedetails/MovieDetailPage";
import SingleRouter from "./movielist/SingleRouter";

const UI = {
    MovieListPage: 'MovieListPage', // movie list
    MovieArtistDetailWrapper: 'MovieArtistDetailWrapper' // movie Detail
};

const WrapperMovies = ({inputText,results}) => {
    console.log('Shows Page Accessed')
   const [ui, setUI] = useState(UI.MovieListPage);
   const [selectedMovieId, setSelectedMovieId] = useState(null);

   const handleSelectMovie = (movieId) => {
       setSelectedMovieId(movieId);
    
       setUI(UI.MovieArtistDetailWrapper);
   };

   const handleBack = () => {
       setSelectedMovieId(null);
       setUI(UI.MovieListPage);
   };
 
   return (
       <>
           {ui === UI.MovieListPage && <SingleRouter onSelectMovie={handleSelectMovie} inputText={inputText} results={results}/>}
           {ui === UI.MovieArtistDetailWrapper && <MovieArtistDetailWrapper movieId={selectedMovieId} back={handleBack} />}
       </>
   );
};

export default WrapperMovies;

