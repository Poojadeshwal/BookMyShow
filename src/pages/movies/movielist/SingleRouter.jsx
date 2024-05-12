import { Form, Modal } from "antd";
import { useRef, useState } from "react";
import MovieListPage from "./MovieListPage";
import CreateUpdate from "./CreateUpdate";
import { removeFunction } from "../../../services/movie/movies";
import { ExclamationCircleFilled } from "@ant-design/icons";

const SingleRouter = ({ onSelectMovie,inputText ,results}) => {
  const [updatedCount, setUpdatedCount] = useState(0);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  let payload = useRef({
    operation: "",
    data: {},
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    payload.current.data = {};
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    payload.current.data = {};
    // console.log("oareent", payload);
  };
  const onDelete = (deleteId) => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        removeFunction(deleteId, "movieId").then(() => {
          setUpdatedCount(updatedCount + 1)
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // console.log("cancel", payload);
  const initFormData = () => {
    console.log("payyyy", payload.current.data);
    payload.current.data.movieId
      ? form.setFieldsValue(payload.current.data)
      : form.resetFields();
  };

  return (
    <>
      <CreateUpdate
        form={form}
        payload={payload}
        setUpdatedCount={setUpdatedCount}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModelOpen}
        updatedCount={updatedCount}
      // onSelectMovie={onSelectMovie}
      />
      <MovieListPage
        payload={payload}
        initFormData={initFormData}
        updatedCount={updatedCount}
        showModal={showModal}
        onSelectMovie={onSelectMovie}
        onDelete={onDelete}
        inputText={inputText}
        results={results}
      />

    </>
  );
};
export default SingleRouter;