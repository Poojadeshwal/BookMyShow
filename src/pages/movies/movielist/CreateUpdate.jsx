import { Modal, Input, Form,  Button, Space } from "antd";
import { addFunction, updateFunction } from "../../../services/movie/movies";
import { TranslateFunction } from "../../../utils/internalisation";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function CreateUpdate({
  isModalOpen,
  handleOk,
  handleCancel,
  payload,
  form,
  setUpdatedCount,
  updatedCount,
}) {
   

  const labels = TranslateFunction("labels");

  const submitForm = (values) => {
    const newFieldValues = {
        ...values,
        "genres": [values["genres"]],
        "languages":[values["languages"]],
        // artist:["dfghj"]
    }
    payload.current.data = { ...payload.current.data, ...newFieldValues };
    console.log(payload.current.data, "create")
    if (payload.current.operation === "ADD") {
      payload.current.data.movieId = Math.random();
      addFunction(payload.current.data).then((data) => {
        // onSelectMovie(data.movieId);
        setUpdatedCount(updatedCount + 1);
        handleCancel();
      });
    } else {
        console.log(payload.current.data,"happy")
      updateFunction(payload.current.data, "movieId").then((data) => {
        console.log("data of updated function",data)
        // onSelectMovie(data.movieId);
        setUpdatedCount(updatedCount + 1);
        handleOk();
       console.log(data);
      });
    }
  };

  return (
    <>
      <Modal
        title="Movie Detail"
        open={isModalOpen}
        onClick={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={submitForm}
          form={form}
          autoComplete="off"
        >
          <Form.Item
         
                label= {labels("Movie Name")}
                name="movieName"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Movie Name!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Movie Name', " />
            </Form.Item >
            <Form.Item
                label={labels("Movie Poster")}

                name="moviePoster"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Movie Poster!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Movie Poster', " />
            </Form.Item >
             <Form.Item
                label={labels("Movie Languages")}
                name="languages"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Movie Languages!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Movie Languages', " />
            </Form.Item >
            <Form.Item
                label={labels("Duration")}
                name="duration"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Duration!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Duration', " />
            </Form.Item >
            <Form.Item
                label={labels("Genres")}
                name="genres"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Genres!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Genres', " />
            </Form.Item >
            <Form.Item
                label={labels("Release Date")}
                name="releaseDate"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Release Date!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Release Date', " />
            </Form.Item >
            <Form.Item
                label={labels("Movie Details")}
                name="movieDetail"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Movie Details!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Movie Details', " />
            </Form.Item >
            <Form.Item
                label={labels("Censor Board Rating")}
                name="censorBoardRating"
                rules={[
                    {
                        required: true,
                        message: 'Please provide Censor Board Rating!',
                    },
                ]}
            >
                <Input style={{
                    width: '100%',
                }} placeholder="'Please provide Censor Board Rating', " />
          </Form.Item>
          <Form.List name="artist">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'block',
                marginBottom: 8,

              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'name']}
                label={labels("artistName")}
                rules={[
                  {
                    required: true,
                    message: 'Missing  name',
                  },
                ]}
              >
              <Input placeholder="Artist Name" />
 
              </Form.Item>
              
             <Form.Item
                {...restField}
                name={[name, 'image']}
                label={labels("artistImage")}
                rules={[
                  {
                    required: true,
                    message: 'Missing  Image',
                  },
                ]}
              >
                <Input placeholder="Artist Image"/>
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{marginLeft:"100%", marginTop:"0"}}/>
            </Space>
          ))}
           <Form.Item style={{marginLeft:120}}>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} >
            {labels("addArtist")}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
                <Form.Item>
            <Button style={{backgroundColor:"rgb(220, 53, 75)", color:"white" }} onClick={handleCancel}>
             {labels("Cancel")} 
            </Button>
            <Button style={{backgroundColor:"rgb(220, 53, 75)", color:"white" }} htmlType="submit">
            {payload.current.operation === "ADD" ? "Add Movie" : "Update Movie"}
          </Button>

          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

