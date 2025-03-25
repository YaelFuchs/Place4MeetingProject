import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/Bookings';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת הזמנה
export const addBooking = async (newBooking) =>{
    try{   
        const newbooking = await axios.post('/addBooking', newBooking);
        console.log('response', response);
        return newbooking;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת הזמנה
export const deleteBooking=async (id)=>{
    try{
    const response = await axios.delete(`/deleteBooking/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון פרטי הזמנה 
export const updateBooking=async (id,booking)=>{
    try {
        const response = await axios.put(`/updateBooking/${id}`,booking);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת הזמנה לפי קוד
export const getBookingById=async (id)=>{
    try{
    const booking=await axios.get(`/getBookingById/${id}`);
    return booking;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל ההזמנות
export const getAllBookings=async ()=>{
    try{
      const response= await axios.get('/getAllBookings');
      console.log('response', response);
      return response;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
}  