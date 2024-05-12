import React, { useEffect, useRef, useState } from "react";
import FilterShowsList from "./FilterShowsList";
import ShowsList from "./ShowsList";
import { getFunction } from "../../../services/events/events";
import { getShowFunction } from "../../../services/shows/shows";
import { Form } from "antd";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookingMultiForm from "./BookingMultiForm";
import moment from "moment";
import { getFunctions } from "../../../services/movie/movies";


export default function CreateBookingPage({setBookingData, next}) {

  const [searchParams, setSearchParams] = useSearchParams()
  
 
  const queryParams = {};
  searchParams.forEach((value, key) => {
      queryParams[key] = value.split("|");  
  });

  console.log("queryParams", queryParams);
  
  console.log("queryParams", queryParams);
      
  const { id } = useParams();
  const [showSearch, setShowSearch] = useState(queryParams);
  const [shows, setShows] = useState(null);
  const [events, setEvents] = useState(null);
  const [movies, setMovies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();


const setSearchUrl = (searchObject) => {
  const newSearchParams = new URLSearchParams();
  Object.entries(searchObject).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      newSearchParams.append(key, value.join("|"));
    } else {
      newSearchParams.append(key, value);
    }
  });  
  setShowSearch(searchObject);
  setSearchParams(newSearchParams);
};


useEffect(() => {
  Promise.all([getFunction(), getShowFunction(), getFunctions()]).then((data) => {
    setEvents(data[0]);
    setMovies(data[2])
    if (id) {
      console.log(id)
      let show = data[1]?.filter((show) => {
        return show.showId === parseInt(id);
      });
      setShows(show);
    } else setShows(data[1]);
  });
}, [id]);
console.log("shows", shows)

  let payload = useRef({
    operation: "",
    data: {},
  });

  const initFormData = () => {
    if(payload.current.data.eventId){
      payload.current.data = {
        ...payload.current.data, 
        date: payload.current.data.date.map(date => moment(date, "DD MMM YYYY")),
        // date: payload.current.data.date.moment("DD MMM YYYY"),
      }
      form.setFieldsValue(payload.current.data)
    }else{
      form.resetFields();
    }
  };
  // console.log(payload.current.data);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  


  // const navigate = useNavigate()
  //   const location = useLocation()


//   const handleBooking = () => {
//     //onSelectMovie(movieId);
//     //console.log('handleSelectMovie location', location)
//     navigate(`/BookingConfirmed`, { state: { from: location } })
// }


  return (
    <>
      {id ? (
        <>
         <ShowsList
         showSearch={showSearch}
         events={events}
         movies={movies}
         shows={shows}
         showModal={showModal}
         payload={payload}
         initFormData={initFormData}
       />
         <BookingMultiForm
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          form={form}
          payload={payload}
          setBookingData={setBookingData}
          next={next}
          // handleBooking={handleBooking}
        />
     </>
      ) : (
        <>
          <FilterShowsList
            showSearch={showSearch}
            setShowSearch={setSearchUrl}
          />
          <ShowsList
            showSearch={showSearch}
            events={events}
            movies={movies}
            shows={shows}
            showModal={showModal}
            payload={payload}
            initFormData={initFormData}
          />

          <BookingMultiForm
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          form={form}
          payload={payload}
          setBookingData={setBookingData}
          next={next}
          // handleBooking={handleBooking}
        />
        </>
      )}
    </>
  );
}
