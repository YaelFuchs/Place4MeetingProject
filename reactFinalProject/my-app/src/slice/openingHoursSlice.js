import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addOpeningHour,deleteOpeningHour,updateOpeningHour,getOpeningHourById,getOpeningHourByPlaceId} from '../service/openingHoursService';

//הוספת שעות פתיחה
export const AddOpeningHour=createAsyncThunk("openingHour/AddOpeningHour" ,async(newOpeningHour,{rejectWithValue})=>{
    try{
      const openingHourData=await  addOpeningHour(newOpeningHour);
      return openingHourData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });
//מחיקת שעות פתיחה
export const DeleteOpeningHour=createAsyncThunk("openingHour/DeleteOpeningHour",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteOpeningHour(id)
        return response        
    }catch(error){
        return rejectWithValue(error);
    }
});
//עדכון שעות פתיחה
export const UpdateOpeningHour=createAsyncThunk("openingHour/UpdateOpeningHour",async(id,openingHour,{rejectWithValue})=>{
    try{
      const response=await updateOpeningHour(id,openingHour)
      return response
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת שעות פתיחה לפי קוד
export const GetOpeningHourById=createAsyncThunk("openingHour/GetOpeningHourById",async(id,{rejectWithValue})=>{
    try{
      const openingHour=await getOpeningHourById(id)
      return openingHour;
    }catch(error){
        return rejectWithValue(error);
    }
});

//החזרת שעות פתיחה לפי קוד מקום
export const GetOpeningHourByPlaceId=createAsyncThunk("openingHour/GetOpeningHourByPlaceId",async(id,{rejectWithValue})=>{
    try{
      const openingHour=await getOpeningHourByPlaceId(id)
      return openingHour;
    }catch(error){
        return rejectWithValue(error);
    }
});

const initialState = {
    openingHour: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}

export const openingHourSlice = createSlice({
    name:'openingHourDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddOpeningHour.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.openingHour=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(AddOpeningHour.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddOpeningHour.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(DeleteOpeningHour.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.openingHour=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(DeleteOpeningHour.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteOpeningHour.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(UpdateOpeningHour.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.openingHour=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(UpdateOpeningHour.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateOpeningHour.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(GetOpeningHourById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.openingHour=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetOpeningHourById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetOpeningHourById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(GetOpeningHourByPlaceId.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.openingHour=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetOpeningHourByPlaceId.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetOpeningHourByPlaceId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })      
    }
});

export const {} = openingHourSlice.actions
export default openingHourSlice.reducer

