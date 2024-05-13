import {
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
  Button,
  Space,
} from "antd";
import { addFunction, updateFunction } from "../../../services/events/events";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { TranslateFunction } from "../../../utils/internalisation";



export default function CreateUpdate({
  isModalOpen,
  handleOk,
  handleCancel,
  payload,
  form, 
  setUpdatedCount,
}) {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const labelDetail = TranslateFunction("labels");

  const submitForm = (values) => {
    // console.log("submit")
    const transformedValue = {
      ...values,
      language: [values["language"]],
      genres: [values["genres"]],
      date: values["date"]?.map((date) => date.format("DD MMM YYYY")),
    };
    
    payload.current.data = { ...payload.current.data, ...transformedValue };
    // console.log(payload, "create");
    if (payload.current.operation === "ADD") {
      payload.current.data.eventId = Math.random();
      addFunction(payload.current.data).then(() => {
        // console.log(payload, "surbhi");
        setUpdatedCount((count) => count + 1);
        handleOk();
      });
    } else {
      updateFunction(payload.current.data, "eventId").then(() => {
        setUpdatedCount((count) => count + 1);
        handleOk();
      });
    }
    payload.current.data = {};
  };
  return (
    <>
      <Modal
        title={labelDetail("eventDetail")}
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
          {/* <Form.Item
            label="Event Id"
            name="eventId"
            rules={[{ required: true, message: "Please input your event Id!" }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label={labelDetail("eventName")}
            name="eventName"
            rules={[
              { required: true, message: "Please input your EventName!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="eventPoster"
            label={labelDetail("eventPoster")}
            rules={[
              { required: true, message: "Please input your Event Poster!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={labelDetail("language")} name="language">
            <Select>
              <Select.Option value="Hindi">Hindi</Select.Option>
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Punjabi">Punjabi</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={labelDetail("eventDuration")}
            name="duration"
            rules={[
              { required: true, message: "Please input your Event Duration!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="genres"
            label={labelDetail("eventGenre")}
            rules={[
              { required: true, message: "Please input your Event Genre!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="venue"
            label={labelDetail("eventVenue")}
            rules={[
              { required: true, message: "Please input your Event Venue!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="censorBoardRating"
            label={labelDetail("censorBoardRating")}
            rules={[
              {
                required: true,
                message: "Please input your Censor Board Rating!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="date" label={labelDetail("date")}>
            <DatePicker multiple onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="eventTime"
            label= {labelDetail("eventTime")}
            rules={[
              { required: true, message: "Please input your Event Time!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label={labelDetail("price")}
            rules={[{ required: true, message: "Please input your Price!" }]}
          >
            <Input />
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
                label={labelDetail("artistName")}
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
                label={labelDetail("artistImage")}
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
            {labelDetail("addArtist")}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>             
          <Form.Item
            name="eventImage"
            label={labelDetail("eventDetailPoster")}
            rules={[
              { required: true, message: "Please input your Event Poster!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              style={{backgroundColor:"rgb(220, 53, 75)", color:"white", marginRight: "10px" }}
              onClick={handleCancel}
            >
              {labelDetail("cancel")}
            </Button>
            <Button style={{backgroundColor:"rgb(220, 53, 75)", color:"white" }} htmlType="submit">
              {payload.current.operation === "ADD"
                ? labelDetail("addEvent")
                : labelDetail("updateEvent")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
