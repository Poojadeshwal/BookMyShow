import { useRef, useState } from "react";
import { Form, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import CreateUpdate from "./CreateUpdate";
import EventListPage from "./EventListPage";
import { removeFunction } from "../../../services/events/events";
import moment from "moment";


export default function FormRouter({ setEvent, next,results }) {
  const [updatedCount, setUpdatedCount] = useState(0);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // console.log("form")
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    initFormData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    payload.current.data = {};
    initFormData();
  };

  const handleDelete = (eventId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to delete this event?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        removeFunction(eventId, "eventId").then(() => {
          setUpdatedCount((count) => count + 1);
        });
      },
    });
  };

  let payload = useRef({
    operation: "",
    data: {},
  });

  const initFormData = () => {
    // console.log("check1", payload.current.data);
    // payload.current.data.eventId
    //   ? form.setFieldsValue(payload.current.data)
    //   : form.resetFields();
    if(payload.current.data.eventId){
      payload.current.data = {
        ...payload.current.data, 
        date: payload.current.data.date.map(date => moment(date, "DD MMM YYYY")),
      }
      // console.log("artist", payload)
      form.setFieldsValue(payload.current.data)
    }else{
      form.resetFields();
    }
  };
  // console.log(payload.current.data);

  return (
    <>
      <CreateUpdate
        form={form}
        payload={payload}
        setUpdatedCount={setUpdatedCount}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModelOpen}
        initFormData={initFormData}
      />

      <EventListPage
        payload={payload}
        initFormData={initFormData}
        updatedCount={updatedCount}
        showModal={showModal}
        setEvent={setEvent}
        next={next}
        handleDelete={handleDelete}
        results={results}
      />
    </>
  );
}