import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addArea,deleteArea,updateArea,getAreaById,getAllArea} from '../service/areaService'

//הוספת אזור
export const AddArea=createAsyncThunk("area/AddArea" ,async(newArea,{rejectWithValue})=>{
    try{
      const areaData=await  addArea(newArea);
      return areaData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });
//מחיקת אזור
export const DeleteArea=createAsyncThunk("area/DeleteArea",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteArea(id)
        return response        
    }catch(error){
        return rejectWithValue(error);
    }
});
//עדכון אזור
export const UpdateArea=createAsyncThunk("area/UpdateArea",async({id:id,area:area},{rejectWithValue})=>{
    try{
      const response=await updateArea({id:id,area:area})
      return response;
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת אזור לפי קוד
export const GetAreaById=createAsyncThunk("area/GetAreaById",async(id,{rejectWithValue})=>{
    try{
      const area=await getAreaById(id)
      return area;
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת כל האזורים
export const GetAllArea=createAsyncThunk("area/GetAllArea",async()=>{
    try{
        const response=await getAllArea()
        return response;
      }catch(error){
          return rejectWithValue(error);
      }
});

const initialState = {
    areas: [],
    area: null, 
    // isConnected: false, 
    loading:false,
    error:null
}

export const AreaSlice = createSlice({
    name:'areaDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddArea.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
            state.areas.push(action.payload);
        })
        .addCase(AddArea.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddArea.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(DeleteArea.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.areas = state.areas.filter(area => area.id !== action.payload);
        })
        .addCase(DeleteArea.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteArea.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(UpdateArea.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.area=action.payload;
        })
        .addCase(UpdateArea.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateArea.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(GetAreaById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.area=action.payload;
        })
        .addCase(GetAreaById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAreaById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(GetAllArea.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.areas=action.payload;
        })
        .addCase(GetAllArea.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllArea.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })      
    }
});

export const {} = AreaSlice.actions
export default AreaSlice.reducer

