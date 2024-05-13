import React from "react"
import WrapperMovies from "../pages/movies/WrapperMovies"
import MovieArtistDetailWrapper from "../pages/movies/moviedetails/MovieDetailPage"
import BookingConfirmed from "../pages/booking/bookingConfirmation/BookingConfirmed"
import SearchApp from "../pages/homepage/SearchBar"
import ArtistDetailPage from "../pages/artists/ArtistDetailPage"
import ArtistList from "../pages/artists/ArtistList"
import EventArtistWrapper from "../pages/events/eventdetail/EventArtistWrapper"
import EventWrapper from "../pages/events/EventWrapper"
import BookingWrapper from "../pages/booking/BookingWrapper"


export const navList = [
    { path:     "/",         name: "Home",        element: <SearchApp/>,       isMenu: true,     isPrivate: false  },
    { path:     "/movies",    name: "Movies",  element: <WrapperMovies/>,      isMenu: true,    isPrivate: true, permissions:["editMovie", "deleteMovie", "addMovie"]  },
    { path:     "/movie/:movieId",    name: "Movie Details",  element: <MovieArtistDetailWrapper/>,      isMenu: false,    isPrivate: false  },
    { path:     "/movie/:id/booking/movie/:movieId",    name: "Shows",    element: <BookingWrapper/>,      isMenu: false,    isPrivate: true  },
    { path:     "/events",    name: "Events",  element: <EventWrapper/>,      isMenu: true,    isPrivate: false  },
    { path:     "/event/:eventId",    name: "Event Details",  element: <EventArtistWrapper/>,      isMenu: false,    isPrivate: false  },  
    { path:     "/artist",    name: "Artist",  element: <ArtistList/>,      isMenu: true,    isPrivate: false  },
    { path:     "/artist/:artistId",    name: "Artist",  element: <ArtistDetailPage/>,      isMenu: false,    isPrivate: false  },
    { path:     "/shows",    name: "Shows",    element: <BookingWrapper/>,      isMenu: true,    isPrivate: false  },
    { path:     "/event/:id/booking/event/:id",    name: "Shows",    element: <BookingWrapper/>,      isMenu: false,    isPrivate: true  },
    { path:     "/bookingConfirmed",    name: "BookingConfirmation",    element: <BookingConfirmed/>,      isMenu: false,    isPrivate: true  },
]