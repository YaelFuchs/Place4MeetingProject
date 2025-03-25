import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/Messages';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת הודעה
export const addMessage = async (newMessage) =>{
    try{   
        const newmessage = await axios.post('/addMassage', newMessage);
        console.log('response', response);
        return newmessage;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת הודעה
export const deleteMessage=async (id)=>{
    try{
    const response = await axios.delete(`/deleteMassage/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון פרטי הודעה
export const updateMessage=async (id,message)=>{
    try {
        const response = await axios.put(`/updateMessage/${id}`,message);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת הודעה לפי קוד
export const getMessageById=async (id)=>{
    try{
    const message=await axios.get(`/getMessageById/${id}`);
    return message;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל ההודעות
export const getAllMessages=async ()=>{
    try{
      const response= await axios.get('/getAllMessages');
      console.log('response', response);
      return response;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
}  

