import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/OrderHistory';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת הזמנה להיסטוריה
export const addOrderHistory = async (newOrder) =>{
    try{   
        const neworder = await axios.post('/addOrderHistory', newOrder);
        console.log('response', response);
        return neworder;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//לא בטוח שצריך..
//מחיקת הזמנה מההיסטוריה
export const deleteOrderHistory=async (id)=>{
    try{
    const response = await axios.delete(`/deleteOrderHistory/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון הזמנה בהיסטוריה
export const updateOrderHistory=async (id,order)=>{
    try {
        const response = await axios.put(`/updateOrderHistory/${id}`,order);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת הזמנה לפי קוד מההיסטוריה
export const getOrderById=async (id)=>{
    try{
    const order=await axios.get(`/getOrderHistoryById/${id}`);
    return order;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל ההזמנות מההיסטוריה
export const getAllOrderHistory=async ()=>{
    try{
      const response= await axios.get('/getAllOrderHistory');
      console.log('response', response);
      return response;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
}  