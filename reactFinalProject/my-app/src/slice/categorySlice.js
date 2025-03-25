import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addCategory,deleteCategory,updateCategory,getCategoryById,getAllCategory} from '../service/categoryService'

//הוספת קטגוריה
export const AddCategory=createAsyncThunk("category/AddCategory" ,async(newCategory,{rejectWithValue})=>{
    try{
      const categoryData=await  addCategory(newCategory);
      return categoryData.data;
    }catch(error){
      return rejectWithValue(error);//במקרה שנכשל ישלח הודעה
    }
 });
//מחיקת קטגוריה
export const DeleteCategory=createAsyncThunk("category/DeleteCategory",async(id,{rejectWithValue})=>{
    try{
        const response=await deleteCategory(id)
        return response.type;        
    }catch(error){
        return rejectWithValue(error);
    }
});
//עדכון קטגוריה
export const UpdateCategory=createAsyncThunk("category/UpdateCategory",async({id:id,category:category},{rejectWithValue})=>{
    try{
      const response=await updateCategory({id:id, category:category})
      return response
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת קטגוריה לפי קוד
export const GetCategoryById=createAsyncThunk("category/GetCategoryById",async(id,{rejectWithValue})=>{
    try{
      const category=await getCategoryById(id)
      return category;
    }catch(error){
        return rejectWithValue(error);
    }
});
//החזרת כל הקטגוריות
export const GetAllCategory=createAsyncThunk("category/GetAllCategory",async()=>{
    try{
        const categoryList=await getAllCategory()
        console.log(categoryList)
        return categoryList;
      }catch(error){
          return rejectWithValue(error);
      }
});

const initialState = {
    categories: [],
    category: null, 
    loading:false,
    error:null
}

export const categorySlice = createSlice({
    name:'categoryDetails',//שם שדרכו נוכל לגשת לנתונים בסטור
    initialState,
    loading:false,
    error:null,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AddCategory.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
            state.categories.push(action.payload);
        })
        .addCase(AddCategory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(AddCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(DeleteCategory.fulfilled,(state,action) => {
            console.log(action.payload);         
            state.loading=false;
            state.error=null;
            state.categories = state.categories.filter(category => category.id !== action.payload);
        })
        .addCase(DeleteCategory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(DeleteCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(UpdateCategory.fulfilled,(state,action) => {
             state.loading=false;
             state.error=null;
             state.category = action.payload
           
        })
        .addCase(UpdateCategory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(UpdateCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(GetCategoryById.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.category=action.payload;//שמירת נתוני המשתמש
        })
        .addCase(GetCategoryById.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetCategoryById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(GetAllCategory.fulfilled,(state,action) => {
            state.loading=false;
            state.error=null;
            state.categories=action.payload;
        })
        .addCase(GetAllCategory.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(GetAllCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })      
    }
});

export const {} = categorySlice.actions
export default categorySlice.reducer

