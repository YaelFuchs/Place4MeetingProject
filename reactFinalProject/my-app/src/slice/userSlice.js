import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {loginUser , signupUser ,deleteUser,updateUser,getUserById,findUserByName,getAllUsers, getImageByUserId} from '../service/userService'

//התחברות
export const login =createAsyncThunk("user/login" ,async (NewUser,{rejectWithValue})=>{
  
   try{
    const userData=await  loginUser(NewUser);
    return userData;
  }catch(error){
    return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
  }
   
});
//הרשמה
export const signup =createAsyncThunk("user/signup" ,async({newUser,image} ,{rejectWithValue})=>{
  try{
    const formData = new FormData();
    formData.append(
    'users',
    new Blob([JSON.stringify(newUser)], { type: 'application/json' }));
    formData.append('image', image);
    const response =await signupUser(formData);
    return response.data;
  }
  catch(error){
    return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
  }
});
//מחיקת משתמש
export const DeleteUser= createAsyncThunk("user/DeleteUser",async(id,{rejectWithValue})=>{
  try{
    const response=await deleteUser(id);
    return response;
  }catch(error){
    return rejectWithValue(error);
  }
});
//עדכון פרטי משתמש
export const UpdateUser=createAsyncThunk("user/UpdateUser" ,async({id,user,image }, {rejectWithValue})=>{
  try{
    const formData = new FormData();
    formData.append(
    'users',
    new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('image', image);
    console.log(formData);
    console.log(id);
    console.log(user);
    const response =await updateUser({id,formData});
    console.log(response);
    console.log(response.data);  
    return response;
  }catch(error){
      return rejectWithValue(error); // Dispatch a rejected action with the error message
   
  }
});
export const GetUserById= createAsyncThunk("user/GetUserById",async(id,{rejectWithValue})=>{
  try{
    const response=await getUserById(id);
    return response;
  }catch(error){
    return rejectWithValue(error);
  }
});
export const GetUserIdByName= createAsyncThunk("user/GetUserIdByName",async(name,{rejectWithValue})=>{
  try{
    const ID=await findUserByName(name);
    return ID;
  }catch(error){
    return rejectWithValue(error);
  }
});
export const GetAllUsers=createAsyncThunk("user/GetAllUsers",async()=>{
  try{
      const userList=await getAllUsers()
      return userList;
    }catch(error){
        return rejectWithValue(error);
    }
});
export const GetImageByUserId= createAsyncThunk("user/GetImageByUserId",async(id,{rejectWithValue})=>{
  try{
    const response=await getImageByUserId(id);
    return response;
  }catch(error){
    return rejectWithValue(error);
  }
});
const initialState = {
  usersList:[],
  user: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
  isConnected: false, // האם המשתמש מחובר
  loading:false,
  error:null
  }
  export const userSlice = createSlice({
  name:'userDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
  initialState,
  loading:false,
  error:null,
  reducers:{
    //פונקציית כניסה לאתר
    logout:(state)=>{
      state.isConnected=false;
      state.user=null;
    },
    
   
 },
 extraReducers:(builder) => {
  builder
  .addCase(login.fulfilled,(state,action) => {
    state.user=action.payload;//שמירת נתוני המשתמש
    state.loading=false;
    state.error=null;
    state.isConnected=true;
  
   })
   .addCase(login.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
   .addCase(login.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;
  })
   .addCase(signup.fulfilled,(state,action)=>{
    state.loading = false;
    state.error = null;
    state.usersList.push(action.payload);
    
   })
   .addCase(signup.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
   .addCase(signup.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;
  })
  .addCase(DeleteUser.fulfilled,(state,action)=>{
    state.loading=false;
    state.error=null;
    state.usersList = state.usersList.filter(user => user.id !== action.payload);
    state.user=null;
   })
   .addCase(DeleteUser.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
   .addCase(DeleteUser.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;;
  })
  .addCase(UpdateUser.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.user = action.payload;
   })
   .addCase(UpdateUser.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
   .addCase(UpdateUser.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;
  })
  .addCase(GetUserById.fulfilled,(state,action)=>{
    state.loading=false;
    state.error=null;
    state.user=state.usersList.filter(user => user.id == action.payload);
   })
   .addCase(GetUserById.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
   .addCase(GetUserById.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;;
  })
  .addCase(GetUserIdByName.fulfilled,(state,action)=>{
    state.loading=false;
    state.error=null;
    state.user=action.payload
   })
   .addCase(GetUserIdByName.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
   .addCase(GetUserIdByName.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;
  })
  .addCase(GetAllUsers.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.usersList = action.payload; // No nested "data" property
  })
  .addCase(GetAllUsers.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
  .addCase(GetAllUsers.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;
  })  
  .addCase(GetImageByUserId.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.user.image = action.payload; // No nested "data" property
  })
  .addCase(GetImageByUserId.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
  .addCase(GetImageByUserId.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload.message;
  })  
 }

  });

export const {logout } = userSlice.actions
export default userSlice.reducer
