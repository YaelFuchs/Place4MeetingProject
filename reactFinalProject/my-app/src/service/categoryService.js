import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/Category';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת קטגוריה
export const addCategory = async (newCategory) =>{
    try{   
        const newcategory = await axios.post('http://localhost:8080/api/Category/addCategory', newCategory);
        return newcategory;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת קטגוריה
export const deleteCategory=async (id)=>{
    try{
    const response = await axios.delete(`http://localhost:8080/api/Category/deleteCategory/${id}`);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//עדכון קטגוריה
export const updateCategory=async ({id,category})=>{ 
    try {
        const response = await axios.put(`http://localhost:8080/api/Category/updateCategory/${id}`,category);
        console.log('response', response.data);
        return response.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }  
}
//החזרת קטגוריה לפי קוד
export const getCategoryById=async (id)=>{
    try{
    const category=await axios.get(`http://localhost:8080/api/Category/getCategoryById/${id}`);
    return category;
} catch (err) {
    console.log('err', err);
    throw err;
}
}
//החזרת כל הקטגוריות
export const getAllCategory=async ()=>{
    try{
      const response= await axios.get('http://localhost:8080/api/Category/getAllCategory');
      console.log('response', response);
      return response.data;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
}