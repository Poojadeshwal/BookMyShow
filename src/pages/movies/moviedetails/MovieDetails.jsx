import { Button, Card, Watermark, Row, Col, Divider, Typography, Flex, Space } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EnvironmentFilled,
  EditOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';

const { Text,Paragraph,Title } = Typography;

const Movies = ({ movieDetails, onSelectArtist, review, back, payload, initFormData, updateCount, showModal, setReview }) => {
  // const nav=useNavigate()
  const [ellipsis, setEllipsis] = useState(true);
  const handleClick = (artistId) => {
    onSelectArtist(artistId)
  }
   
  const findReview = () => {
    if (review &&  movieDetails &&  movieDetails.length > 0) {
      console.log(review, "check");
      const movieIds =  movieDetails.map( movie =>  movie.movieId);
      return review.filter(review => movieIds.includes(review.categoryId));
    }
    return [];
  };
  const movieReviews = findReview();

  const initCreateUpdate = () => {
    payload.current.operation = "ADD";
    payload.current.data = {};
    setReview([...review, payload.current.operation])
    initFormData();
  }
  console.log("payload", payload.current.data)
  return (
    <>
      <Flex style={{ justifyContent: "space-between", marginBottom: "10px" }}>
        <Button className="backButton" onClick={back} style={{ backgroundColor: "rgb(248,68,100)", color: "white" }}>
          <ArrowLeftOutlined />
          Back
        </Button>

      </Flex>
      {movieDetails?.map((movie)=>(
        <>
      <Card
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%),url(${movie.moviePoster})`,
          // background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${movie.moviePoster})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',

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
            {<img style={{ width: "80%", height: 500, paddingLeft: "30px", paddingTop: "30px", zIndex: 3 }}
              src={movie.moviePoster}
              alt={movie.movieName} />}

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

            }} content={movie.movieName}>
              <Typography.Title style={{ color: "white", fontSize: "70px", marginBottom: "25px" }}>{movie.movieName}</Typography.Title>
              <Button style={{
                marginBottom: "10px", fontSize: "20px",
                height: "50px",
              }}>
                {movie.languages + " "}
              </Button>
              <Typography style={{ color: "white", fontSize: "20px", marginBottom: "5px" }}>
                {movie.duration}
              </Typography>
              <Typography style={{ color: "white", fontSize: "20px", marginBottom: "5px" }}>
                {movie.releaseDate}
              </Typography>
              <Typography style={{ color: "white", fontSize: "20px", marginBottom: "20px" }}>

                {movie.genres + " "}
              </Typography>
              <Link to={`/movie/${movie.movieId}/booking/movie/${movie.movieId}`}>


                <Button
                  style={{
                    size: "large",
                    backgroundColor: "rgb(248,68,100)",
                    fontSize: "20px",
                    color: "black",
                    width: "200px",
                    height: "50px",
                    alignItems: "center",
                    marginRight: "5px",
                    color: "white"
                  }}
                >
                  Book tickets
                </Button>
              </Link>

              <Button
                style={{
                  size: "large",
                  backgroundColor: "rgb(248,68,100)",
                  fontSize: "20px",
                  color: "black",
                  width: "200px",
                  height: "50px",
                  alignItems: "center",
                  color: "white"
                }}
                onClick={() => { initCreateUpdate(); showModal() }}
              >
                Add Review
              </Button>
            </Watermark>
          </Col>
        </Row>
      </Card>
      <Card>
        <Typography.Title>About the Movie</Typography.Title>
        <Text>{movie.movieDetail}</Text>
      </Card>

       <Card>
         <Typography.Title>Cast</Typography.Title>
         <Row gutter={16}>
         {movie.artist?.map(artist=>(
            <Col span={3}>
              <div key={artist?.artistId} onClick={() => {
                 // nav(`/artist/${artist.artistId}`)
                handleClick(artist?.artistId)
              }}>
                {<img style={{ width: 130, height: 130, borderRadius: '50%' }}
                  src={artist.image}
                  alt={artist.name} />}
                <Title level={4}>{artist.name}</Title>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
      </>
              ))}
      {/* <Divider /> */}
      <Typography.Title style={{ marginLeft: "1.5%" }}>
        Top reviews
      </Typography.Title>
      <Flex style={{marginBottom:"40px"}}>
        <Row gutter={16}>
          {movieReviews.map((movieReview) => (
            <Col span={6}>
              <Card
                style={{
                  width: 400,
                  marginLeft: "2.5%",
                  marginBottom: "5%"
                }}
              >
                <Flex style={{ justifyContent: "space-between", marginBottom: 20 }}>
                  <Typography>
                    <UserOutlined
                      style={{
                        background: "#999",
                        fontSize: "30px",
                        borderRadius: "60%",
                        color: "white",
                        marginRight: "10px",
                      }}
                    />
                    {movieReview?.userId}
                  </Typography>
                  <Typography>
                    <StarFilled style={{ color: "#fdd835", marginRight: 20 }} />
                    {movieReview?.rating}/5
                  </Typography>
                </Flex>
                <Paragraph  ellipsis={
                  ellipsis
                    ? {
                      rows: 1,
                      expandable: true,
                      symbol: 'more',
                    }
                    : false
                }>{movieReview?.review}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>
    </>
  );
};

export default Movies;

























