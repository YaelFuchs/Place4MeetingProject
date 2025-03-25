import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/OpeningHours';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת שעות פתיחה
export const addOpeningHour = async (newOpeningHour) =>{
    try{   
        const newopeningHour = await axios.post('/addOpeningHour', newOpeningHour);
        console.log('response', response);
        return newopeningHour;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת שעות פתיחה
export const deleteOpeningHour=async (id)=>{
    try{
    const response = await axios.delete(`/deleteOpeningHour/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון שעות פתיחה
export const updateOpeningHour=async (id,OpeningHour)=>{
    try {
        const response = await axios.put(`/updateUser/${id}`,OpeningHour);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת שעות פתיחה לפי קוד
export const getOpeningHourById=async (id)=>{
    try{
    const OpeningHour=await axios.get(`/getOpeningHourById/${id}`);
    return OpeningHour;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת שעות פתיחה לפי מקום
export const getOpeningHourByPlaceId=async (id)=>{
    try{
    const OpeningHour=await axios.get(`/getByPlaceId/${id}`);
    return OpeningHour;
} catch (err) {
    console.log('err', err);
    throw err;
}
}