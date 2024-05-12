import React from 'react';
import { Typography, Col, Row, Button, Space, Layout, Divider } from 'antd';
import { HomeOutlined, FacebookOutlined, LinkedinOutlined, InstagramOutlined, XOutlined, PinterestOutlined, YoutubeOutlined } from '@ant-design/icons';
import { TranslateFunction } from '../../utils/internalisation';

const { Footer } = Layout;
const { Text } = Typography;
const FooterFile = () => {
    const labels = TranslateFunction("labels");
    return (
        // <Layout>
        <Footer
            style={{
                textAlign: 'center',
                backgroundColor: "GhostWhite"
            
            }}
        >
            <Row style={{ paddingBottom: "20px" }}>
                <Col span={24}>

                    <HomeOutlined style={{
                        color: 'pink',
                        fontSize: '30px',
                        marginRight: "10px",
                    }} />
                    <Text style={{ fontSize: '20px', fontWeight: "bold" }}>{labels("List your Show")} </Text>
                    <Space />
                    <Text style={{ fontSize: '15px', marginLeft: "20px", fontWeight: 550 }}>{labels("Got a show,event,activity or a great experience? Partner with us & get listed on ShowBooking")}</Text>
                    <Button  style={{ backgroundColor: "rgb(248,68,100)", color: "white", marginLeft: "25px" }}>{labels("Contact Us!")}</Button>
                </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
                <Col span={8}>
                    <img src="\assets\footer-images\Care.png" alt="customer" style={{ width: 160, height: 80 }} />
                    <br></br>
                    <Text>{labels("24/7 Customer Care")}</Text>
                </Col>
                <Col span={8}>
                    <img src="\assets\footer-images\MovieTicket.png" alt="MovieTicket" style={{ width: 160, height: 80 }} />
                    <br></br>
                    <Text>{labels("Resend Booking Confirmation")}</Text>
                </Col>
                <Col span={8}>
                    <img src="\assets\footer-images\Letter.png" alt="customer" style={{ width: 160, height: 80 }} />
                    <br></br>
                    <Text>{labels("Subsrcibe to Newsletter")}</Text>
                </Col>
                <Divider ><img src="assets\logos\logo.png" alt="Logo" style={{ width: 150, height: 35 }} /></Divider>
            </Row>
            <Row style={{ paddingTop: "20px", justifyContent: "center", fontSize: "30px" }}>

                <FacebookOutlined style={{ marginRight: "10px" }} />
                <LinkedinOutlined style={{ marginRight: "10px" }} />
                <InstagramOutlined style={{ marginRight: "10px" }} />
                <XOutlined style={{ marginRight: "10px" }} />
                <PinterestOutlined style={{ marginRight: "10px" }} />
                <YoutubeOutlined style={{ marginRight: "10px" }} />
            </Row>
            <Row style={{ paddingTop: "30px", justifyContent: "center" }}>
          {labels("Show Booking")} ©{new Date().getFullYear()} {labels("Created by NBCS Pvt Limited. All Rights Reserved")} 
                <br></br>

                <Text>{labels("The content and the images used on this site are copyright protected and copyrights vest with the respected owners. The usage of the content on this website is intended to promote the work and no endrosement of the artist shall be implied.Unauthorised use is prohibited and punishable  by law.")} </Text>
            </Row>

        </Footer>
        // </Layout>
    );
};
export default FooterFile;