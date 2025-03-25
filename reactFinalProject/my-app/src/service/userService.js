import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/Users';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';


//פונקציה להכנס לאפליקציה
export const loginUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:8080/api/Users/login', user);
        console.log('response', response);
        return response.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//הרשמה
export const signupUser= async (formData) =>{

    try{
        const response=await axios.post('http://localhost:8080/api/Users/signup',formData,{ 
        headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error; 
    }
}
//מחיקת משתמש
export const deleteUser= async (id) =>{
    try {
        const response = await axios.delete(`http://localhost:8080/api/Users/deleteUser/${id}`);
        console.log('response', response);
        return response.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//עדון פרטי משתמש
export const updateUser=async ({id,formData}) =>{
    try {
        console.log(id);
        console.log(formData);
        
        const response = await axios.put(`http://localhost:8080/api/Users/updateUser/${id}`,formData,{ 
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//החזרת משתמש לפי קוד
export const getUserById=async (id) =>{
    try {
        const user = await axios.get(`http://localhost:8080/api/Users/getUserById/${id}`);
        return user;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מציאת משתמש לפי שם
export const findUserByName= async (userName)=>{
    try{
        const id= await axios.get('http://localhost:8080/api/Users/findIdByName',userName)
        return id;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
export const getAllUsers= async ()=>{
    try{
      const response= await axios.get('http://localhost:8080/api/Users/getAllUsers');
      return response.data; // החזר את הנתונים מהשרת
    }catch (error) {
      console.log('err', error);
      throw error;
  } 

}
export const getImageByUserId=async (id) =>{
    try {
        const image = await axios.get(`http://localhost:8080/api/Users/getImageByUserId/${id}`);
        return image.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}