import axios from 'axios';

axios.defaults.baseURL  = 'http://localhost:8080/api/FavoritePlaces';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

//הוספת מקום אהוב
export const addFavoritePlace = async (newFavoritePlace ) =>{
    try{   
        const newfavoritePlace  = await axios.post('http://localhost:8080/api/FavoritePlaces/addFavoritePlace', newFavoritePlace );
        
        return newfavoritePlace.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
//מחיקת מקום אהוב
export const deleteFavoritePlace=async (id)=>{
    try{   
    const response = await axios.delete(`http://localhost:8080/api/FavoritePlaces/deleteFavoritePlace/${id}`);
    console.log(response);
    return response;
} catch (err) {
    console.log('err', err);
    throw err;
}
}


//החזרת כל המקומות האהובים
export const getAllFavoritePlace=async (id)=>{
    try{
      const response= await axios.get(`http://localhost:8080/api/FavoritePlaces/getAllFavoritePlaces/${id}`);
      console.log('response', response);
      return response.data;
  } catch (err) {
      console.log('err', err);
      throw err;
  } 
}  