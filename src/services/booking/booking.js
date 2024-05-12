import bookingDetail from './booking.json';
import crudOperation from '../../utils/crud';

let bookingInfo =  bookingDetail;

export function getBookingFunction(){
  return new Promise((resolve)=>{
    bookingInfo = crudOperation.get(bookingInfo);
    resolve(bookingInfo);
})
}

export function addBookingFunction(newBooking){   
  return new Promise((resolve) =>{
      bookingInfo = crudOperation.add([...bookingInfo], newBooking);
      resolve(bookingInfo);
  });
}

// export function addBookingFunction(data){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 1000); 
//   });
// };

  