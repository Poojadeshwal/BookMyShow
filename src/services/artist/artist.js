
import artist from '../../services/artist/artist.json'
import CrudOperation from '../../utils/CrudOperation';
let artistDetail=artist;

export function getArtist(){
    return new Promise((resolve)=>{
        artistDetail=CrudOperation.get(artistDetail);
        resolve(artistDetail)
    })
}
export function artistDetailFunction(artistId, pk){
    return new Promise((resolve)=>{
        let artistDetails = CrudOperation.getDetail(artistDetail, artistId, pk);
        
        resolve(artistDetails);
    })
}
// export function addArtist(newArtist){   
//     return new Promise((resolve) =>{
//         artistDetail = CrudOperation.add(artistDetail, newArtist);
//     resolve(artistDetail);
//     })
// }

// export function removeArtist(artistId, pk){
//     return new Promise((resolve)=>{
//         artistDetail = CrudOperation.delete(artistDetail, artistId, pk)
//     resolve(artistDetail);
//     })
// }

// export function updateArtist(updatedArtist, pk){
//     return new Promise((resolve)=>{
//         artistDetail = CrudOperation.update(artistDetail, updatedArtist, pk);
//     resolve(artistDetail);
//     })
// }