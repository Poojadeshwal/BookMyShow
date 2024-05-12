import CrudOperation from '../../utils/CrudOperation';
import movies from '../../services/movie/movies.json'

let moviesDetail = movies;
console.log(moviesDetail)

export function getFunctions(){
    return new Promise((resolve)=>{
         moviesDetail=CrudOperation.get(moviesDetail);
        resolve(moviesDetail)
    })
}
export function moviesDetailFunction(movieId, pk){
    return new Promise((resolve)=>{
        let movieDetail = CrudOperation.getDetail(moviesDetail, movieId, pk);
        resolve(movieDetail);
    })
}

export function addFunction(newMovie){   
    return new Promise((resolve) =>{
    moviesDetail = CrudOperation.add([...moviesDetail], newMovie);
    console.log("add", moviesDetail);
    resolve(moviesDetail);
    })
}

export function removeFunction(movieId, pk){
    return new Promise((resolve)=>{
    moviesDetail = CrudOperation.delete([...moviesDetail], movieId, pk)
    resolve(moviesDetail);
    })
}

export function updateFunction(updatedMovie, pk){
    return new Promise((resolve)=>{
        console.log("mob", updatedMovie, moviesDetail);
    moviesDetail = CrudOperation.update([...moviesDetail], updatedMovie, pk);
    console.log(moviesDetail,"pooja")
    resolve(moviesDetail);
    })
}