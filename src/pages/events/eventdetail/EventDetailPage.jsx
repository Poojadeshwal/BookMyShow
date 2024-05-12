import React, { useEffect, useState, useRef } from "react";
import { getDetailFunction, getFunction } from "../../../services/events/events";
import EventDetail from "./EventDetail";
import { getReviewFunction } from "../../../services/review/review";
import AddReview from "./AddReview";
import { Form } from "antd";

export default function EventDetailPage({ event, back, onSelectArtist, eventId }) {
  console.log('EventDetailPage reached', eventId)
  const [review, setReview] = useState(null);
  const [updatedCount, setUpdatedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const[eventDetail, setEventDetail] = useState(null);

   const eventNumber = parseInt(eventId);
  //  console.log(eventNumber)

   useEffect(()=>{
    console.log("called")
    getDetailFunction(eventNumber, "eventId").then((detail)=>{
      console.log(detail);
      setEventDetail(detail);
    })
   },[eventNumber])

   console.log(eventDetail)
  console.log("event detail", eventDetail)

  useEffect(() => {
    getReviewFunction().then((data) => {
      setReview(data);
    });
  }, [updatedCount]);

  const findReview = () => {
    if (review && eventDetail && eventDetail.length > 0) {
      console.log(review, "check");
      const eventIds = eventDetail.map(event => event.eventId);
      return review.filter(review => eventIds.includes(review.categoryId));
    }
    return [];
  };
  const eventReviews = findReview();
  console.log(eventReviews)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const payload = useRef({
    operation: "",
    data: {},
  });

  const initFormData = () => {
   payload.current.data.reviewId ?
   form.setFieldsValue(payload.current.data)
   : form.resetFields();
  };

  // console.log("data",payload.current.data)



  return (
    <>
      <AddReview
        form={form}
        payload={payload}
        setUpdatedCount={setUpdatedCount}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        setReview={setReview}
      />
      {eventDetail &&  (
      <EventDetail
        eventDetail={eventDetail}
        onSelectArtist={onSelectArtist}
        back={back}
        review={eventReviews}
        payload={payload}
        initFormData={initFormData}
        updatedCount={updatedCount}
        showModal={showModal}
        setReview={setReview}
      />)}
    </>
  );
}
