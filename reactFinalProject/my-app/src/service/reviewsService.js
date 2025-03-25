import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/Reviews';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';


//הוספת תגובה
export const addReview = async (newReview) =>{
    try{   
        const newreview = await axios.post('http://localhost:8080/api/Reviews/addReview', newReview);
        console.log('response', response);
        return newreview;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

//מחיקת תגובה
export const deleteReview=async (id)=>{
    try{
    const response = await axios.delete(`http://localhost:8080/api/Reviews/deleteReview/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון תגובה
export const updateReview=async (id,review)=>{
    try {
        const response = await axios.put(`http://localhost:8080/api/Reviews/updateReview/${id}`,review);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת תגובה לפי קוד
export const getReviewById=async (id)=>{
    try{
    const review=await axios.get(`/getReviewById/${id}`);
    return review;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל התגובות
export const getAllReviews=async (id)=>{
    try{
      const response= await axios.get(`http://localhost:8080/api/Reviews/getAllReviews/${id}`);
      console.log('response', response);
      return response;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
}  
// export const  getReviewsByPlaceId=async (placeId)=>{
//     try{
//         console.log(placeId);
//         const reviews= await axios.get(`http://localhost:8080/api/Reviews/getReviewsByPlaceId/${id}`);
//         return reviews; 
//     }catch(arr){
//        throw err; 
//     }
// }