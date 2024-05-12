import React, { useState } from 'react';
import { Modal, Input, Form, Button, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
//import { addBookingFunction } from '../../../services/booking/booking';
// import { Link } from 'react-router-dom';

const UI = {
  Form1: "Form1",
  Form2: "Form2",
  Form3: "Form3"
};

export default function BookingMultiForm({ isModalOpen, handleCancel, handleOk, form, payload, setBookingData, next }) {
    const [currentUi, setCurrentUi] = useState(UI.Form1);
    const [formData, setFormData] = useState(null);
    
    const navigate = useNavigate();
  
    const handleSubmit1 = (values) => {
      payload.current.data = { ...payload.current.data, ...values };
      setCurrentUi(UI.Form2);
    };
  
    const handleSubmit2 = (values) => {
      payload.current.data = { ...payload.current.data, ...values };
      setCurrentUi(UI.Form3);
    };
    
    const submitForm = (values) => {
      const transformedValue = {
        ...values,
        date: values["date"]?.map((date) => date.format("DD MMM YYYY")),
      };
      payload.current.data = { ...payload.current.data, ...transformedValue};
      if (payload.current.operation === 'ADD') {
        payload.current.data.eventId = Math.random();
        console.log("payload", payload.current.data)
        handleOk();
        // setFormData({...payload.current.data, ...transformedValue}); 
        navigate('/bookingConfirmed', {state: payload.current.data}); 
      }
    }


  return (
    <Modal
      title="Personal & Booking Detail"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {currentUi === UI.Form1 && (
        <Form
        labelCol={{span:10}}
          name="form1"
          initialValues={{ remember: true }}
          onFinish={handleSubmit1}
          form={form}
          autoComplete='off'
        >
        <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          { required: true, message: "Please input your Age!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      label="Phone Number"
      name="phoneNumber"
        
        rules={[
          { required: true, message: "Please input your Phone Number!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      label="Email"
        name="email"
        
        rules={[
            { required: true, message: "Please input your Email Id!" },
          ]}
      >
        <Input />
      </Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      )}
      {currentUi === UI.Form2 && (
        <Form
        labelCol={{span:10}}
          name="form2"
          initialValues={{ remember: true }}
          onFinish={handleSubmit2}
          form={form}
          autoComplete='off'
        >
           <Form.Item
        label="Movie Name / Event Name"
        name="movieName"
        rules={[{ required: true, message: "Please input your Movie name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tickets"
        name="tickets"
        rules={[{ required: true, message: "Please input your Tickets!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="date" label="DatePicker">
          <DatePicker multiple/>
        </Form.Item>

      <Form.Item
        label="Time"
        name="timing"
        rules={[
          { required: true, message: "Please input your Timing!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
            { required: true, message: "Please input your Price!" },
          ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="seatNumber"
        label="Seat Number"
        rules={[
          { required: true, message: "Please input your Seat Number!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      name="totalPrice"
        label="Total Price"
        
        rules={[{ required: true, message: "Please input your Total Price!" }]}
      >
        <Input />
      </Form.Item>
          <Button type="primary" onClick={() => setCurrentUi(UI.Form1)} style={{marginRight:20}}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      )}
      {currentUi === UI.Form3 && (     
        <Form
        labelCol={{span:10}}
        name='form3'
          onFinish={submitForm}
          form={form}
          autoComplete='off'
        >
            <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          { required: true, message: "Please input your age!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          { required: true, message: "Please input your Phone Number!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
       label="Email"
       name="email"
        rules={[
            { required: true, message: "Please input your Email Id!" },
          ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Movie Name / Event Name"
        name="movieName"
        rules={[{ required: true, message: "Please input your Movie name!" }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Tickets"
        name="tickets"
        rules={[{ required: true, message: "Please input your Tickets!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="date" label="DatePicker">
          <DatePicker multiple/>
        </Form.Item>

      <Form.Item
        label="Time"
        name="timing"
        rules={[
          { required: true, message: "Please input your Time!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
            { required: true, message: "Please input your Price!" },
          ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
         name="seatNumber"
         label="Seat Number"
        rules={[
          { required: true, message: "Please input your Seat Number!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Total Price"
        name="totalPrice"
        rules={[{ required: true, message: "Please input your Total Price!" }]}
      >
        <Input />
      </Form.Item>
          <Button type="primary" onClick={() => setCurrentUi(UI.Form2)} style={{marginRight:20}}>
            Back
          </Button>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
        </Form>
      )}
    </Modal>
  );
}
