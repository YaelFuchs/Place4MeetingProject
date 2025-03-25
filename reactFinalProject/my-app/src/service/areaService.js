import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/Area';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת אזור
export const addArea = async (newarea) =>{
    try{   
        const newArea = await axios.post('http://localhost:8080/api/Area/addArea', newarea);
        return newArea;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת אזור
export const deleteArea=async (id)=>{
    try{
    const response = await axios.delete(`http://localhost:8080/api/Area/deleteArea/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון אזור
export const updateArea=async ({id,area})=>{
    try {
        const response = await axios.put(`http://localhost:8080/api/Area/updateArea/${id}`,area);
        console.log('response', response);
        return response.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת אזור לפי קוד
export const getAreaById=async (id)=>{
    try{
    const area=await axios.get(`http://localhost:8080/api/Area/getAreaById/${id}`);
    return area;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל האזורים
export const getAllArea=async ()=>{
    try{
      const response= await axios.get('http://localhost:8080/api/Area/getAllArea');
      console.log('response', response.data);
      return response.data;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
  
}