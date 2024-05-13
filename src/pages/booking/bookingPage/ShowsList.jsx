import { Typography, Button, Flex, Divider } from "antd";
import React, { useEffect, useState } from "react";
import {
  EnvironmentFilled,
  InfoCircleFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const filterShows = (shows, showSearch) => {
  return shows.filter((show) => {
    if (
      !showSearch ||
      (!Array.isArray(showSearch.language) || showSearch.language.length === 0 || showSearch.language.some((language) => show.language.includes(language))) &&
      (!Array.isArray(showSearch.location) || showSearch.location.length === 0 || showSearch.location.some((location) => show.venue.includes(location)))
    ) {
      return true;
    }
    return false;
  });
};
const ShowsList = ({ showSearch, shows, events, showModal, payload,  initFormData, movies}) => {

 
  const [filteredShow, setFilteredShow] = useState(null);
 
  // console.log("show checking",shows);

  useEffect(() => {
    if (showSearch && shows) {
      let filteredEvents = filterShows(shows, showSearch);
      setFilteredShow(filteredEvents);
    }
  }, [shows, showSearch]);

  useEffect(() => {
    if (showSearch && shows) {
      let filteredMovies = filterShows(shows, showSearch);
      setFilteredShow(filteredMovies);
    }
  }, [shows, showSearch]);


  return (
    <>
      {filteredShow && filteredShow.length > 0 ? (
        filteredShow.map((show, index) => (
          <Show
            key={show.showId}
            show={show}
            events={events}
            movies={movies}
            index={show.showId}
            showModal={showModal}
            payload={payload}

            initFormData={initFormData} 
          />
        ))
      ) : (
        <div>No event found</div>
      )}
    </>
  );
};

const Show = ({ show, events, movies, showModal, payload, initFormData }) => {
  const { id } = useParams();
  // console.log("id",id)
  const findEvent = (categoryId) => {
    return events.find((event) => event.eventId === categoryId);
  };
  const event = findEvent(show.categoryId);

  const findMovie = (categoryId) => {
    return movies?.find((movie) => movie.movieId === categoryId);
  };
  const movie = findMovie(show.categoryId);


  const initCreateUpdate = () => {
    payload.current.operation = "ADD";
    payload.current.data = {};
    initFormData();
  }
  // console.log(payload.current.data, "payload")


  return (
    <>
    {event && (
      <>
      {id && (
        <>
          <Typography.Title style={{ marginLeft: "50px", marginTop: "50px" }}>
            {event.eventName}
          </Typography.Title>
          <Button
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              padding: 0,
              marginLeft: "50px",
              marginRight: "20px",
              color: "#6C6C6C",
              boxShadow: "5px 5px",
            }}
          >
            {event.censorBoardRating}
          </Button>
          {event.genres.map((genre) => (
            <Button
              style={{
                height: "40px",
                color: "rgb(220, 53, 75)",
                fontSize: "20px",
                marginRight: "10px",
              }}
            >
              {genre}
            </Button>
          ))}
          <Flex style={{ marginLeft: "10%", marginTop: "20px" }}>
            {event.language.map((language) => (
              <Button
                style={{
                  height: "30px",
                  marginLeft: "20px",
                  color: "rgb(220, 53, 75)",
                }}
              >
                {language}
              </Button>
            ))}
          </Flex>
        </>
      )}
      <Divider />
      <Flex>
        <Typography.Title level={4} style={{ width: "50%", marginLeft: "3%" }}>
          <HeartOutlined style={{ marginRight: "10px", color: "grey" }} />
          {event?.eventName}
        </Typography.Title>
        <Button
          style={{ marginTop: "30px", color: "#4ABD5D", height: "40px", marginRight: "25%" }}
        >
          {show.timing}
        </Button>
        <Button
          onClick={() => { initCreateUpdate(); showModal() }}
          style={{ marginTop: "30px", color: "white", height: "40px", backgroundColor: "rgb(220, 53, 75)" }}
        >
          BOOK
        </Button>
      </Flex>
      <Typography>
        <EnvironmentFilled
          style={{ color: "#fdd835", marginLeft: "5%", marginRight: "5px" }}
        />
        {show.venue}
      </Typography>
      <Typography style={{ color: "#6C6C6C" }}>
        <InfoCircleFilled
          style={{
            marginLeft: "52%",
            width: "10px",
            marginRight: "10px",
            color: "#FFC610",
          }}
        />
        Non-Cancellable
      </Typography>
    </> 
  )}
 
 {movie&&(
    <>
    {id && (
        <>
          <Typography.Title style={{ marginLeft: "50px", marginTop: "50px" }}>
            {movie.movieName}
          </Typography.Title>
          <Button
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              padding: 0,
              marginLeft: "50px",
              marginRight: "20px",
              color: "#6C6C6C",
              boxShadow: "5px 5px",
            }}
          >
            {movie.censorBoardRating}
          </Button>
          {movie.genres.map((genre) => (
            <Button
              style={{
                height: "40px",
                color: "rgb(220, 53, 75)",
                fontSize: "20px",
                marginRight: "10px",
              }}
            >
              {genre}
            </Button>
          ))}
          <Flex style={{ marginLeft: "10%", marginTop: "20px" }}>
            {movie.languages.map((language) => (
              <Button
                style={{
                  height: "30px",
                  marginLeft: "20px",
                  color: "rgb(220, 53, 75)",
                }}
              >
                {language}
              </Button>
            ))}
          </Flex>
        </>
      )}
      <Divider />
      <Flex>
        <Typography.Title level={4} style={{ width: "50%", marginLeft: "3%" }}>
          <HeartOutlined style={{ marginRight: "10px", color: "grey" }} />
          {movie.movieName}
        </Typography.Title>
        {show.timing.map((show)=>(
 <Button
 style={{ marginTop: "30px", color: "#4ABD5D", height: "40px", marginRight:"20px" }}
>
 {show}
</Button>
        ))}
       
        <Button
          onClick={() => { initCreateUpdate(); showModal() }}
          style={{ marginTop: "30px", color: "white", height: "40px", backgroundColor: "rgb(220, 53, 75)", marginLeft:"6%" }}
        >
          BOOK
        </Button>
      </Flex>
      <Typography>
        <EnvironmentFilled
          style={{ color: "#fdd835", marginLeft: "5%", marginRight: "5px" }}
        />
        {show.venue}
      </Typography>
      <Typography style={{ color: "#6C6C6C" }}>
        <InfoCircleFilled
          style={{
            marginLeft: "52%",
            width: "10px",
            marginRight: "10px",
            color: "#FFC610",
          }}
        />
        Non-Cancellable
      </Typography>
    </>
  )}
   </>
  );
};
export default ShowsList;