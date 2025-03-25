import axios from "axios";

axios.defaults.baseURL  = 'http://localhost:8080/api/Places'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת מקום
export const addPlace = async (formData) =>{
    try{   
        const newplace = await axios.post('http://localhost:8080/api/Places/addPlaces',formData,{ 
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
       
        return newplace.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת מקום
export const deletePlace=async (id)=>{
    try{
    const response = await axios.delete(`http://localhost:8080/api/Places/deletePlaces/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון פרטי מקום
export const updatePlace=async ({id,formData})=>{
    try {
        const response = await axios.put(`http://localhost:8080/api/Places/updatePlaces/${id}`,formData);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת מקום ספציפי לפי קוד
export const getPlaceById=async (id)=>{
    try{
    const place=await axios.get(`http://localhost:8080/api/Places/getPlaceById/${id}`);
    console.log(place.data);  
    return place.data;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל המקומות
export const getAllPlaces = async ()=>{
  try{
    const response= await axios.get('http://localhost:8080/api/Places/getAllPlaces');
    return response.data; // החזר את הנתונים מהשרת
  }catch (error) {
    console.log('err', error);
    throw error;
} 
}
export const getPlacesByCategoryId=async (categoryId)=>{
    try{
        const place = await axios.get(`http://localhost:8080/api/Places/getPlacesByCategory/${categoryId}`);
        return place.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
export const getPlacesByArea=async (areaId)=>{
    try{
        const place=await axios.get(`http://localhost:8080/api/Places/getPlacesByArea/${areaId}`);
        return place.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
export const getAllBySearch=async (search)=>{
    try{
        const place=await axios.get(`http://localhost:8080/api/Places/getAllBySearch/${search}`);
        console.log(place); 
        console.log(place.data);         
        return place.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const getImageByPlaceId=async (id) =>{
    try {
        const image = await axios.get(`http://localhost:8080/api/Places/getImageByPlaceId/${id}`);
        return image.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}




