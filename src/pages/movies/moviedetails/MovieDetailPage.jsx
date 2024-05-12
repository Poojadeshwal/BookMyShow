import { useEffect, useRef, useState } from "react"
import {  Form } from "antd"
import Movies from "./MovieDetails"
import {  moviesDetailFunction } from "../../../services/movie/movies"
import ArtistDetailPage from "../../artists/ArtistDetailPage"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getReviewFunction } from "../../../services/review/review"
import Reviews from "../../reviews/Reviews"


const MovieDetailPage = ({ back, movieId, onSelectArtist }) => {

    console.log('MovieDetailPage reached', back, movieId, onSelectArtist)
    const [movieDetails, setMovieDetails] = useState(null)
    const [review, setReview] = useState(null);
    const [updatedCount, setUpdatedCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getReviewFunction().then((data) => {
            setReview(data);
        });
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const payload = useRef({
        operation: "",
        data: {},
    });
    const initFormData = () => {
        if (payload.current.data) {
            form.setFieldsValue(payload.current.data);
        } else {
            form.resetFields();
        }
    };
    // console.log("data", payload.current.data)
    // console.log(review);


    // useEffect(() => {
    //     Promise.all([getFunctions(),
    //     getFunctions(),//artist
    //     getFunctions()//reviews
    //     ])
    //         .then((data) => {
    //             console.log('promises data', data)
    //             setMovieDetails({ movieDetail: data[0], reviews: data[1], artist: data[2] })
    //         }).catch(error => {
    //             console.error('Error fetching data:', error);
    //         })
    //     //     getFunction()
    //     //           .then((data) => {
    //     //             setMovieDetails(data);
    //     //           })
    // }, [])
    const selectedMovie = parseInt(movieId);
    useEffect(()=>{
     console.log("called")
     moviesDetailFunction(selectedMovie, "movieId").then((detail)=>{
       // console.log(detail,"detail of the artist");
       setMovieDetails(detail);
     })
    },[selectedMovie])
   console.log(movieDetails,"details of movie")
    // let selectedMovie = null;


    // if (movieDetails) {
    //     selectedMovie = movieDetails.movieDetail.find(movie => movie.movieId == movieId);
    // }
    
   
   
    return (
        <>
            <Reviews
                form={form}
                payload={payload}
                setUpdatedCount={setUpdatedCount}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isModalOpen={isModalOpen}
                setReview={setReview}
            />
            {movieDetails &&
                <Movies
                movieDetails={movieDetails}
                    onSelectArtist={onSelectArtist}
                    back={back}
                    review={review}
                    payload={payload}
                    initFormData={initFormData}
                    updatedCount={updatedCount}
                    showModal={showModal}
                    setReview={setReview}
                />}
        </>
    )
}
//   export default MovieDetailPage






const UI = {
    ArtistDetailPage: 'ArtistDetailPage', 
    MovieDetailPage: 'MovieDetailPage' 
};
const MovieArtistDetailWrapper = ({ back, movieId }) => {
    
    const [ui, setUI] = useState(UI.MovieDetailPage);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    let handleSelectArtist = (artistId) => {
        setSelectedArtistId(artistId);
        setUI(UI.ArtistDetailPage);
    };

    const params=useParams()
    const navigate = useNavigate()
    const location = useLocation()

    if(params.movieId){
        movieId=params.movieId

        back=()=>{
            let url = (location.state?.from?.pathname+location.state?.from?.search||'') || "/movies" 
            //console.log('back url',location, url)
            //navigate(from, { replace: true }); 
            navigate(url)
        }
        handleSelectArtist=artistId=>navigate(`/artist/${artistId}`, { state: { from: location }})
        console.log('MovieArtistDetailWrapper reached',movieId)
    }



    const artistBack = () => {
        setSelectedArtistId(null);
        setUI(UI.MovieDetailPage);
    };

    return (
        <>
            {ui === UI.MovieDetailPage && <MovieDetailPage onSelectArtist={handleSelectArtist} back={back} movieId={movieId} />}
            {ui === UI.ArtistDetailPage && <ArtistDetailPage artistId={selectedArtistId} back={artistBack} />}
        </>
    );
}

export default MovieArtistDetailWrapper;


