import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addOrderHistory,deleteOrderHistory,updateOrderHistory,getAllOrderHistory,getOrderById} from '../service/orderHistorySrevice'

//הוספת הזמנה
export const AddOrderHistory=createAsyncThunk("orderHistory/AddOrderHistory" ,async(newOrderHistory,{rejectWithValue})=>{
    try{
      const orderHistoryData=await  addOrderHistory(newOrderHistory);
      return orderHistoryData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });

 //מחיקת הזמנה
 export const DeleteOrderHistory=createAsyncThunk("orderHistory/DeleteOrderHistory",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteOrderHistory(id)
        return response        
    }catch(error){
        return rejectWithValue(error);
    }
});
 //עדכון הזמנה
 export const UpdateOrderHistory=createAsyncThunk("orderHistory/UpdateOrderHistory",async(id,orderHistory,{rejectWithValue})=>{
    try{
      const response=await updateOrderHistory(id,orderHistory)
      return response
    }catch(error){
        return rejectWithValue(error);
    }
});
 //החזרת הזמנה לפי קוד
 export const GetOrderHistoryById=createAsyncThunk("orderHistory/GetOrderHistoryById",async(id,{rejectWithValue})=>{
    try{
      const orderHistory=await getOrderById(id)
      return orderHistory;
    }catch(error){
        return rejectWithValue(error);
    }
});

 //החזרת כל ההזמנות
 export const GetAllOrderHistory=createAsyncThunk("orderHistory/GetAllOrderHistory",async({rejectWithValue})=>{
    try{
        const response=await getAllOrderHistory()
        return response
      }catch(error){
          return rejectWithValue(error);
      }
});

const initialState = {
    orderHistory: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}

export const orderHistorySlice = createSlice({
    name:'orderHistoryDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddOrderHistory.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.orderHistory=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(AddOrderHistory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddOrderHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(DeleteOrderHistory.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.orderHistory=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(DeleteOrderHistory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteOrderHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(UpdateOrderHistory.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.orderHistory=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(UpdateOrderHistory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateOrderHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(GetOrderHistoryById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.orderHistory=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetOrderHistoryById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetOrderHistoryById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(GetAllOrderHistory.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.orderHistory=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetAllOrderHistory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllOrderHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })      
    }
});

export const {} = orderHistorySlice.actions
export default orderHistorySlice.reducer

