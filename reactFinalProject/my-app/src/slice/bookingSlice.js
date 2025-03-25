import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addBooking,deleteBooking,updateBooking,getBookingById,getAllBookings} from '../service/bookingsService'

//הוספת הזמנה
export const AddBooking=createAsyncThunk("booking/AddBooking" ,async(newBooking,{rejectWithValue})=>{
    try{
      const bookingData=await  addBooking(newBooking);
      return bookingData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });
//מחיקת הזמנה
export const DeleteBooking=createAsyncThunk("booking/DeleteBooking",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteBooking(id)
        return response        
    }catch(error){
        return rejectWithValue(error);
    }
});
//עדכון הזמנה
export const UpdateBooking=createAsyncThunk("booking/UpdateBooking",async(id,booking,{rejectWithValue})=>{
    try{
      const response=await updateBooking(id,booking)
      return response
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת הזמנה לפי קוד
export const GetBookingById=createAsyncThunk("booking/GetBookingById",async(id,{rejectWithValue})=>{
    try{
      const booking=await getBookingById(id)
      return booking
    }catch(error){
        return rejectWithValue(error);
    }
});

//החזרת כל ההזמנות
export const GetAllBookings=createAsyncThunk("place/GetAllBookings",async({rejectWithValue})=>{
    try{
        const response=await getAllBookings()
        return response
      }catch(error){
          return rejectWithValue(error);
      }
});

const initialState = {
    bookings: [],
    booking: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}
export const bookingSlice = createSlice({
    name:'bookingDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddBooking.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.bookings.push(action.payload);
        })
        .addCase(AddBooking.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddBooking.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(DeleteBooking.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.bookings=state.bookings.filter(booking => booking.id !== action.payload);
        })
        .addCase(DeleteBooking.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteBooking.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(UpdateBooking.fulfilled,(state,action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.bookings.findIndex((booking) => booking.id === id);
        
            if (index !== -1) {
                state.bookings[index] = { ...state.bookings[index], ...updatedData };
                state.loading = false;
                state.error = null;
                // אם יש צורך לשמור את המקום שעודכן במשתנה נפרד, ניתן להוסיף:
                state.booking = state.bookings[index];
            } else {
                console.error('הזמנה לא נמצא');
            }
        })
        .addCase(UpdateBooking.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateBooking.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(GetBookingById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.booking=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetBookingById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetBookingById.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(GetAllBookings.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.bookings=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetAllBookings.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllBookings.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })      
    }
});

export const {} = bookingSlice.actions
export default bookingSlice.reducer

