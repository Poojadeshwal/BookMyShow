import { Button, Card, Watermark, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from 'antd';
import { artistDetailFunction} from "../../services/artist/artist";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;

const ArtistDetailPage = ({ back, artistId }) => {
   
    const params=useParams()
    const navigate = useNavigate();
    let location = useLocation();

    if(params.artistId){
        artistId=params.artistId
        back=()=>{
            let url = location.state?.from?.pathname || "/artist" 
            //console.log('back url',location, url)
            //navigate(from, { replace: true }); 
            navigate(url)
        }
    }
    console.log("artistId",artistId)

    const [artistDetails, setArtistDetails] = useState(null);
    // useEffect(() => {
    //     getArtist()
    //         .then((data) => {
    //             // console.log("promise data", data)
    //             setArtistDetails(data);
    //         })
    // }, [])

    // let selectedArtist = null
    // if (artistDetails) {
    //     selectedArtist = artistDetails.find(artist => artist.artistId == artistId);
    // }
    const selectedArtist = parseInt(artistId);
     useEffect(()=>{
      console.log("called")
      artistDetailFunction(selectedArtist, "artistId").then((detail)=>{
        // console.log(detail,"detail of the artist");
        setArtistDetails(detail);
      })
     },[selectedArtist])

    return (
        <>
            {artistDetails ? (
                <>
                    <Button onClick={back} style={{ backgroundColor: "rgb(248,68,100)", color: "white" }}>
                        <ArrowLeftOutlined />
                        Back
                    </Button>
                    { artistDetails.map((artistDetails)=>(
                    <>
                  
                        <Card
                            style={{

                                backgroundColor: "black",
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                height: 500
                            }}
                        >
                            <Row>
                                <Col span={8}

                                    hoverable
                                    style={{
                                        width: "100%",
                                        height: 500,
                                    }}
                                >
                                    {<img style={{ width: 350, height: 350, borderRadius: "50%", marginLeft: "100px", marginTop: "50px" }}
                                        src={artistDetails.image}
                                        alt={artistDetails.name} />}

                                </Col>
                                <Col span={16}
                                    style={{
                                        width: "100%",
                                        height: 600,
                                        textAlign: "left",
                                        padding: "50px",
                                    }}>
                                    <Watermark style={{
                                        width: "100%",
                                        height: 500,

                                    }} content={artistDetails.name}>
                                        <Typography.Title style={{ color: "white", fontSize: "50px" }}>{artistDetails.name}</Typography.Title>

                                        <Text style={{ color: "white", fontSize: "20px" }}> {"Role:  "}     {artistDetails.role + " "}{"   "}</Text>
                                        <br></br>
                                        <Text style={{ color: "white", fontSize: "20px" }}>
                                         {"Born:  "}   {artistDetails.born}{" "}

                                            <br></br>
                                            {"Birthplace:  "} {artistDetails.birthplace}{" "}
                                            <br></br>
                                           {"KnownAs:  "}    {artistDetails.knownAs + " "}
                                        </Text>
                                    </Watermark>
                                </Col>
                            </Row>
                        </Card>
                        <div style={{ marginLeft: "150px", marginRight: "150px", marginBottom: "50px" }}>
                            <Typography.Title> About</Typography.Title>
                            <Text style={{ fontSize: "20px" }}> {artistDetails.about}</Text>
                        </div>
                    </>
                    ))}
                </>
            ) : (
                <Card>
                    Loading...
                </Card>
            )}
        </>
    );
}

export default ArtistDetailPage;










