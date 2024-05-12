
// import React, { useEffect, useState } from "react";
// import { getFunction } from "../../../services/movie/movies";
// import { Card, Col, Row, Space, Button, Modal, Flex } from "antd";
// import Meta from "antd/es/card/Meta";

// import { useNavigate } from 'react-router-dom';
// import {
//   EditOutlined,
//   DeleteOutlined,
//   ExclamationCircleFilled,
//   PlusOutlined,
// } from "@ant-design/icons";

// const filterMovies = (movies, searchObj) => {
//   return movies.filter((movie) => {
//     if (!searchObj || ((!searchObj.genre || movie.genres.includes(searchObj.genre)) && (!searchObj.language || movie.languages.includes(searchObj.language))))
//       return true;
//     return false
//   })
// };

// const Movies = ({
//   onDelete,
//   payload,
//   initFormData,
//   updatedCount,
//   showModal, onSelectMovie, results, searchObj }) => {

//   const [movies, setMovies] = useState(null);
//   const [filteredMovies, setFilteredMovies] = useState(null);
//   useEffect(() => {
//     getFunction().then((movies) => {
//       setMovies(movies)
//       console.log("listtttt", movies);
//     })

//   }, [updatedCount]);
//   useEffect(() => {
//     if (searchObj && movies) {
//       let filteredMovies = filterMovies(movies, searchObj);
//       console.log("f1", filteredMovies);
//       setFilteredMovies(filteredMovies);
//     }
//   }, [movies, searchObj]);

//   // const handleMovieClick = (movieId) => {
//   //     onSelectMovie(movieId); 
//   // };


//   const handleMovieClick = (movieId) => {
//     onSelectMovie(movieId);
//   };

//   const initCreateUpdate = (id) => {
//     if (id === undefined) {
//       payload.current.operation = "ADD";
//       payload.current.data = {};
//       initFormData();
//       // setMovies([...movies, payload.current.data]);
//     } else {
//       payload.current.operation = "UPDATE";
//       payload.current.data.movieId = id;
//       console.log(payload.current.data.movieId)

//       console.log("id", id)
//       const movieObj = movies?.find(
//         (movie) => movie.movieId === id
//       );

//       payload.current.data = movieObj;
//       console.log("load", payload.current.data)
//       initFormData();
//       console.log(movieObj, "coffee");
//     }
//   };
//   return (
//     <>
//       {results && results.length > 0 ? (
//         <>
//           <Row gutter={16} >

//             {results && results.map((movie, index) => (
//               <Col span={6}>
//                 <Space size="small">
//                   <Movie
//                     index={movie.movieId}
//                     onDelete={onDelete}
//                     initCreateUpdate={initCreateUpdate}
//                     showModal={showModal} key={movie.movieId} movie={movie} handleMovieClick={handleMovieClick} style={{
//                       width: 300,
//                       height: 400,
//                       backgroundColor: "white",
//                       display: "flex",
//                       alignItems: "center",
//                       flexDirection: "column",

//                     }} />
//                 </Space>
//               </Col>
//             ))}
//           </Row>
//         </>
//       ) : (
//         <>
//           <Button
//             className="addButton"
//             style={{ marginBottom: "5px", marginLeft: "80%", width: "15%", marginTop: 0, backgroundColor: "rgb(248,68,100)", color: "white" }}
//             onClick={() => { initCreateUpdate(); showModal() }}
//           >
//             Add Movies
//           </Button>
//           <Row gutter={16} >

//             {filteredMovies && filteredMovies.map((movie, index) => (
//               <Col span={6}>
//                 <Space size="small">
//                   <Movie
//                     index={movie.movieId}
//                     onDelete={onDelete}
//                     initCreateUpdate={initCreateUpdate}
//                     showModal={showModal} key={movie.movieId} movie={movie} handleMovieClick={handleMovieClick} style={{
//                       width: 300,
//                       height: 400,
//                       backgroundColor: "white",
//                       display: "flex",
//                       alignItems: "center",
//                       flexDirection: "column",

//                     }} />
//                 </Space>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}
//     </>
//   )
// };


// const Movie = ({ movie, index, handleMovieClick,
//   onDelete, initCreateUpdate, showModal }) => {
//   const nav = useNavigate()
//   const handleClick = () => {
//     handleMovieClick(movie.movieId);
//   };
//   return (
//     <>
//       <Card
//         key={movie.movieId}
//         onClick={handleClick}
//         hoverable
//         style={{ width: 260, height: 400, marginTop: "30px" }}
//         cover={<img style={{ height: 320 }} src={movie.moviePoster} alt="Movie Poster" />}
//       // onClick={() => {
//       //handleMovieClick(movie.movieId)
//       // nav(`/movie/${movie.movieId}`)
//       // }
//       // } 
//       >
//         <Meta title={movie.movieName} description={movie.genres?.join(", ")} />
//       </Card>
//       <Card style={{ margin: 0, width: 260, height: 50, marginBottom: 50 }}>
//         <Flex style={{ justifyContent: "space-between" }}>
//           <EditOutlined key="edit" onClick={() => { initCreateUpdate(movie.movieId); showModal() }} />
//           <DeleteOutlined key="delete" onClick={() => onDelete(movie.movieId)} />
//         </Flex>
//       </Card>
//     </>
//   )
// }

// export default Movies;






import React, { useEffect, useState } from "react";
import {  getFunctions } from "../../../services/movie/movies";
import { Card, Col, Row, Space, Button, Modal, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import PermissionButton from "../../../structure/PermissionButton";
import { useNavigate } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";


const filterMovies = (movies, searchObj) => {
  return movies.filter((movie) => {
    if (!searchObj || ((!searchObj.genre || movie.genres.includes(searchObj.genre)) && (!searchObj.language || movie.languages.includes(searchObj.language))))
      return true;
    return false
  })
};

const Movies = ({
  onDelete,
  payload,
  initFormData,
  updatedCount,
  showModal, onSelectMovie, results, searchObj }) => {

  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  useEffect(() => {
    getFunctions().then((movies) => {
      setMovies(movies)
      console.log("listtttt", movies);
    })

  }, [updatedCount]);
  useEffect(() => {
    if (searchObj && movies) {
      let filteredMovies = filterMovies(movies, searchObj);
      console.log("f1", filteredMovies);
      setFilteredMovies(filteredMovies);
    }
  }, [movies, searchObj]);

  // const handleMovieClick = (movieId) => {
  //     onSelectMovie(movieId); 
  // };


  const handleMovieClick = (movieId) => {
    onSelectMovie(movieId);
  };

  const initCreateUpdate = (id) => {
    if (id === undefined) {
      payload.current.operation = "ADD";
      payload.current.data = {};
      initFormData();
      // setMovies([...movies, payload.current.data]);
    } else {
      payload.current.operation = "UPDATE";
      payload.current.data.movieId = id;
      console.log(payload.current.data.movieId)

      console.log("id", id)
      const movieObj = movies?.find(
        (movie) => movie.movieId === id
      );

      payload.current.data = movieObj;
      console.log("load", payload.current.data)
      initFormData();
      console.log(movieObj, "coffee");
    }
  };
  return (
    <>
      {results && results.length > 0 ? (
        <>
          <Row gutter={16} >

            {results && results.map((movie, index) => (
              <Col span={6}>
                <Space size="small">
                  <Movie
                    index={movie.movieId}
                    onDelete={onDelete}
                    initCreateUpdate={initCreateUpdate}
                    showModal={showModal} key={movie.movieId} movie={movie} handleMovieClick={handleMovieClick} style={{
                      width: 300,
                      height: 400,
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",

                    }} />
                </Space>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
         <PermissionButton allowedPermissions={["addMovie"]} >
        
          <Button
            className="addButton"
            style={{ marginBottom: "5px", marginLeft: "80%", width: "15%", marginTop: 0, backgroundColor: "rgb(248,68,100)", color: "white" }}
            onClick={() => { initCreateUpdate(); showModal() }}
          >
            Add Movies
          </Button>
          </PermissionButton>
          <Row gutter={16} >

            {filteredMovies && filteredMovies.map((movie, index) => (
              <Col span={6}>
                <Space size="small">
                  <Movie
                    index={movie.movieId}
                    onDelete={onDelete}
                    initCreateUpdate={initCreateUpdate}
                    showModal={showModal} key={movie.movieId} movie={movie} handleMovieClick={handleMovieClick} style={{
                      width: 300,
                      height: 400,
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",

                    }} />
                </Space>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
};


const Movie = ({ movie, index, handleMovieClick,
  onDelete, initCreateUpdate, showModal }) => {
  const nav = useNavigate()
  const handleClick = () => {
    handleMovieClick(movie.movieId);
  };
  return (
    <>
      <Card
        key={movie.movieId}
        onClick={handleClick}
        hoverable
        style={{ width: 260, height: 400, marginTop: "30px" }}
        cover={<img style={{ height: 320 }} src={movie.moviePoster} alt="Movie Poster" />}
      // onClick={() => {
      //handleMovieClick(movie.movieId)
      // nav(`/movie/${movie.movieId}`)
      // }
      // } 
      >
        <Meta title={movie.movieName} description={movie.genres?.join(", ")} />
      </Card>
      <PermissionButton allowedPermissions={["deleteMovie","editMovie"]} >
      <Card style={{ margin: 0, width: 260, height: 50, marginBottom: 50 }}>
    
        <Flex style={{ justifyContent: "space-between" }}>
          <EditOutlined key="edit" onClick={() => { initCreateUpdate(movie.movieId); showModal() }} />
          <DeleteOutlined key="delete" onClick={() => onDelete(movie.movieId)} />
        </Flex>
       
      </Card>
      </PermissionButton>
    </>
  )
}

export default Movies;







