import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addFavoritePlace,deleteFavoritePlace,getAllFavoritePlace} from '../service/favoritePlacesService';

//הוספת מקום אהוב
export const AddFavoritePlace=createAsyncThunk("favoritePlace/AddFavoritePlace" ,async(newFavoritePlace,{rejectWithValue})=>{
    try{
        console.log(newFavoritePlace);
        
      const favoritePlaceData=await  addFavoritePlace(newFavoritePlace);
      return favoritePlaceData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });

//מחיקת מקום אהוב
export const DeleteFavoritePlace=createAsyncThunk("favoritePlace/DeleteFavoritePlace",async(id,{rejectWithValue})=>{
    try{
        
        const response=await deleteFavoritePlace(id)     
        return response;      
    }catch(error){
        return rejectWithValue(error);
    }
});

//החזרת כל המקומות האהובים
export const GetAllFavoritePlaces=createAsyncThunk("favoritePlace/GetAllFavoritePlaces",async(id,{rejectWithValue})=>{
    try{
        const response=await getAllFavoritePlace(id)
        return response;
      }catch(error){
          return rejectWithValue(error);
      }
});

const initialState = {
    favoritePlaces:[],
    favoritePlace: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}
export const favoritePlaceSlice = createSlice({
    name:'favoritePlaceDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddFavoritePlace.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
            state.favoritePlaces.push(action.payload);
        })
        .addCase(AddFavoritePlace.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddFavoritePlace.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(DeleteFavoritePlace.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.favoritePlaces = state.favoritePlaces.filter(favoritePlace => favoritePlace.id !== action.payload);
        })
        .addCase(DeleteFavoritePlace.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteFavoritePlace.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        
        .addCase(GetAllFavoritePlaces.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.favoritePlaces=action.payload;
        })
        .addCase(GetAllFavoritePlaces.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllFavoritePlaces.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })      
    }
});

export const {} = favoritePlaceSlice.actions
export default favoritePlaceSlice.reducer

