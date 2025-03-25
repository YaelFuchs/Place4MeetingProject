import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addPlace,deletePlace,updatePlace,getAllPlaces,getPlaceById,getPlacesByCategoryId ,getPlacesByArea ,getAllBySearch,getImageByPlaceId} from '../service/placesService'

//הוספת מקום
export const AddPlace=createAsyncThunk("place/AddPlace" ,async({newPlace,image},{rejectWithValue})=>{
    try{
        const formData = new FormData();
        formData.append(
        'place',
        new Blob([JSON.stringify(newPlace)], { type: 'application/json' }));
        formData.append('image', image);
      const placeData=await  addPlace(formData);
      return placeData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });

 //מחיקת מקום
 export const DeletePlace=createAsyncThunk("place/DeletePlace", async(id,{rejectWithValue})=>{
    try{
        const response=await deletePlace(id)
        return response;        
    }catch(error){
        return rejectWithValue(error);
    }
});
 //עדכון מקום
 export const UpdatePlace=createAsyncThunk("place/UpdatePlace",async({id:id,place:place},{rejectWithValue})=>{
    try{
        const formData = new FormData();
        formData.append(
        'place',
        new Blob([JSON.stringify(place)], { type: 'application/json' }));
      const response=await updatePlace({id,formData})
      return response;
    }catch(error){
        return rejectWithValue(error);
    }
});
 //החזרת מקום לפי קוד
 export const GetPlaceById=createAsyncThunk("place/GetPlaceById",async(id,{rejectWithValue})=>{
    try{
      const place=await getPlaceById(id)
      console.log(place);
      
      return place;
    }catch(error){
        return rejectWithValue(error);
    }
});

 //החזרת כל המקומות
 export const GetAllPlaces=createAsyncThunk("place/GetAllPlaces",async()=>{
    try{
        const placesList=await getAllPlaces()
        return placesList;
      }catch(error){
          return rejectWithValue(error);
      }
});
export const GetPlacesByCategoryId=createAsyncThunk("place/GetPlacesByCategoryId",async({categoryId})=>{
    try{
        const places=await getPlacesByCategoryId(categoryId)
        return places;
      }catch(error){
          return rejectWithValue(error);
      }
});
export const GetPlacesByAreaId=createAsyncThunk("place/GetPlacesByAreaId",async({areaId})=>{
    try{
        const places=await getPlacesByArea(areaId)
        return places;
      }catch(error){
          return rejectWithValue(error);
      }
});
export const GetAllBySearch=createAsyncThunk("place/GetAllBySearch",async({search})=>{
    try{
        const places=await getAllBySearch(search)
        console.log(places);        
        return places;
      }catch(error){
          return rejectWithValue(error);
      }
});
export const GetImageByPlaceId= createAsyncThunk("user/GetImageByPlaceId",async(id,{rejectWithValue})=>{
    try{
      const response=await getImageByPlaceId(id);
      return response;
    }catch(error){
      return rejectWithValue(error);
    }
  });
const initialState = {
    places:[], 
    selectedPlace: null,
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}

export const placeSlice = createSlice({
    name:'placeDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddPlace.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.places.push(action.payload);
          })
          .addCase(AddPlace.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(AddPlace.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Use error message from action
          })
        .addCase(DeletePlace.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.places = state.places.filter(place => place.id !== action.payload);
        })       
        .addCase(DeletePlace.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeletePlace.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(UpdatePlace.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;              
                state.selectedPlace =action.payload;
          
        })
        .addCase(UpdatePlace.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(UpdatePlace.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(GetPlaceById.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
            state.selectedPlace = action.payload;
        })
        .addCase(GetPlaceById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetPlaceById.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(GetAllPlaces.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.places = action.payload; // No nested "data" property
        })
        .addCase(GetAllPlaces.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllPlaces.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })  
        .addCase(GetPlacesByCategoryId.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.places=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetPlacesByCategoryId.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetPlacesByCategoryId.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        }) 
        .addCase(GetPlacesByAreaId.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.places = action.payload; 
        })
        .addCase(GetPlacesByAreaId.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetPlacesByAreaId.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })  
        .addCase(GetAllBySearch.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.places = action.payload; 
        })
        .addCase(GetAllBySearch.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllBySearch.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })  
        .addCase(GetImageByPlaceId.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.selectedPlace = action.payload; 
        })
        .addCase(GetImageByPlaceId.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetImageByPlaceId.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })  
          
    }
});

export const {} = placeSlice.actions
export default placeSlice.reducer

