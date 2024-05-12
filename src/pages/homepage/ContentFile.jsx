import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import EventWrapper from "../events/EventWrapper";
// import reals from '/assets/logos/reals.jpg'
const { Text,Title } = Typography;
const ContentFile = () => {


    return (
        <>
        <Card
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%),url("assets/logos/homeStreamImg.webp")`,
          // background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${movie.moviePoster})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height:"150px",
          marginLeft:"60px",
          marginRight:"60px"

        }}
      >
        <Row>
          <Col span={8}

            hoverable
            style={{
              width: "100%",
              height: 600,
            }}
          >
             {<img style={{ width: "25%", height: 40, paddingLeft: "150px", paddingTop: "5px", zIndex: 3 }}
              src={"assets/logos/logo.png"}
               />}
                 < Typography.Title style={{color:"White",paddingLeft: "150px",fontSize:"40px", height:"60px",marginBottom:"10px",
                lineHeight:"10px",fontWeight:"bold"}}>STREAM</Typography.Title>
          </Col>
         < Typography.Title style={{color:"White",fontFamily:"serif",fontSize:"55px"}}>Endless Entertainement Anytime.Anywhere!</Typography.Title>
        </Row>
      </Card>

        <EventWrapper/>
       
        </>
    );
}

export default  ContentFile;


