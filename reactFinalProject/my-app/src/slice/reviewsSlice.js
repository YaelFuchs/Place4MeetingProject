import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addReview,deleteReview,updateReview,getReviewById,getAllReviews} from '../service/reviewsService'

//הוספת תגובה
export const AddReview=createAsyncThunk("review/AddReview" ,async(newReview,{rejectWithValue})=>{
    try{
      const reviewData=await  addReview(newReview);
      return reviewData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });

 //מחיקת תגובה
 export const DeleteReview=createAsyncThunk("review/DeleteReview",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteReview(id)
        return response        
    }catch(error){
        return rejectWithValue(error);
    }
});
 //עדכון תגובה
 export const UpdateReview=createAsyncThunk("review/UpdateReview",async(id,review,{rejectWithValue})=>{
    try{
      const response=await updateReview(id,review)
      return response
    }catch(error){
        return rejectWithValue(error);
    }
});
 //החזרת תגובה לפי קוד
 export const GetReviewById=createAsyncThunk("review/GetReviewById",async(id,{rejectWithValue})=>{
    try{
      const review=await getReviewById(id)
      return review;
    }catch(error){
        return rejectWithValue(error);
    }
});

 //החזרת כל התגובות
 export const GetAllReviews=createAsyncThunk("review/GetAllReviews",async(id,{rejectWithValue})=>{
    try{
        const response=await getAllReviews(id)
        return response.data;
      }catch(error){
          return rejectWithValue(error);
      }
});
// export const GetReviewsByPlaceId=createAsyncThunk("review/GetReviewsByPlaceId",async({placeId})=>{
//     try{
//         console.log(placeId);      
//         const reviewsList=await getReviewsByPlaceId(placeId);
//         return reviewsList;
//     }catch(error){
//         return rejectWithValue(error);
//     }
// });

const initialState = {
    reviews:[],
    review: null, // נתוני המשתמש, יתחילו כ-null עד שהמשתמש יתחבר
    // isConnected: false, // האם המשתמש מחובר
    loading:false,
    error:null
}

export const reviewSlice = createSlice({
    name:'reviewDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddReview.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.reviews.push(action.payload);
        })
        .addCase(AddReview.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(DeleteReview.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        })
        .addCase(DeleteReview.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(UpdateReview.fulfilled,(state,action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.review.findIndex((review) => review.id === id);
        
            if (index !== -1) {
                state.review[index] = { ...state.review[index], ...updatedData };
                state.loading = false;
                state.error = null;
                // אם יש צורך לשמור את המקום שעודכן במשתנה נפרד, ניתן להוסיף:
                state.review = action.payload;
            } else {
                console.error('מקום לא נמצא');
            }
        
        })
        .addCase(UpdateReview.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(GetReviewById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.review=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetReviewById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetReviewById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(GetAllReviews.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.reviews=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetAllReviews.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllReviews.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }) 
        // .addCase(GetReviewsByPlaceId.fulfilled,(state,action) => {
        //     state.loading=false;
        //     state.error=null;
        //     state.reviews=action.payload;//שמירת נתוני המשתמש
        // })
        // .addCase(GetReviewsByPlaceId.pending,(state)=>{
        //     state.loading=true;
        //     state.error=null;
        // })
        // .addCase(GetReviewsByPlaceId.rejected,(state,action)=>{
        //     state.loading = false;
        //     state.error = action.payload.message;
        // })           
    }
});

export const {} = reviewSlice.actions
export default reviewSlice.reducer

