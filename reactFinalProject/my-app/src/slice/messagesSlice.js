import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addMessage,deleteMessage ,updateMessage,getMessageById,getAllMessages}from '../service/messagesService'

//הוספת הודעה
export const AddMessage=createAsyncThunk("message/AddMessage" ,async(newMessage,{rejectWithValue})=>{
    try{
      const messageData=await  addMessage(newMessage);
      return messageData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });
//מחיקת הודעה
export const DeleteMessage=createAsyncThunk("message/DeleteMessage",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteMessage(id)
        return response        
    }catch(error){
        return rejectWithValue(error);
    }
});
//עדכון הודעה
export const UpdateMessage=createAsyncThunk("message/UpdateMessage",async(id,message,{rejectWithValue})=>{
    try{
      const response=await updateMessage(id,message)
      return response
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת הודעה לפי קוד
export const GetMessageById=createAsyncThunk("message/GetMessageById",async(id,{rejectWithValue})=>{
    try{
      const message=await getMessageById(id)
      return message;
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת כל ההודעות
export const GetAllMessages=createAsyncThunk("message/GetAllMessages",async({rejectWithValue})=>{
    try{
        const response=await getAllMessages()
        return response
      }catch(error){
          return rejectWithValue(error);
      }
});

const initialState = {
    messages:[],
    message: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}

export const messageSlice = createSlice({
    name:'messageDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddMessage.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.messages.push(action.payload);
        })
        .addCase(AddMessage.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddMessage.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(DeleteMessage.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.message=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(DeleteMessage.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteMessage.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(UpdateMessage.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.message=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(UpdateMessage.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateMessage.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(GetMessageById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.message=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetMessageById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetMessageById.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(GetAllMessages.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.message=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetAllMessages.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllMessages.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })      
    }
});

export const {} = messageSlice.actions
export default messageSlice.reducer

