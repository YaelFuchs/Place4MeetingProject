import React ,{ useState ,useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch ,useSelector } from 'react-redux'
import Navbar from '../components/Navbar';
import { GetAllCategory,AddCategory ,UpdateCategory,DeleteCategory} from '../slice/categorySlice';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Edit, Delete} from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';





export default function CategoryManagement() {
const dispatch=useDispatch();
const navigate = useNavigate();
const [isEditing, setIsEditing] = useState(false);
const [editedCategoryId, setEditedCategoryId] = useState(null); 
const [categoryName,setCategoryName]=useState('');
const [isAdding, setIsAdding] = useState(false);
const categoriesList=useSelector(state=> state.categoryDetails.categories)

useEffect(() => {
    dispatch(GetAllCategory());
  }, [dispatch]);


  // פונקציה להוספת קטגוריה חדשה
  const handleAddCategory =async(e) => {
        e.preventDefault();
        setIsEditing(true);
        if(!categoryName){
            alert("שדה חובה נא למלא!")
        }
        const newCategory={
            categoryName:categoryName
        }
        try{
            const response= await dispatch(AddCategory(newCategory))
            console.log(response);
            if(response.type.match("category/UpdateCategory/fulfilled"))
            alert("הקטגוריה נוספה בהצלחה")
            setIsAdding(false);
            setCategoryName("");
        }catch(error){
            alert("שגיאה במערכת")
        }
  };
  const handleEditCategory = (id) => {
    setEditedCategoryId(id);
    setIsEditing(true);
  };

  // פונקציה לעריכה של קטגוריה
  const handleUpdateCategory = async(Id,categoryname) => {
    console.log(Id);
    console.log(categoryname);
    if(!categoryname){
        alert("שדה חובה נא למלא!")
    }
    const updateCategory={
        id:Id,
        categoryName:categoryname
    }
    console.log(updateCategory);
    
    try{
        const response= await dispatch(UpdateCategory({id:updateCategory.id, category:updateCategory}))
        console.log(response);
        if (response==="category/UpdateCategory/fulfilled") {
        alert("הקטגוריה עודכנה בהצלחה");
        setIsEditing(false);
        setEditedCategoryId(null);


        }
        else{
            alert("שגיאה בעדכון");
        }
    }catch(error){
        alert("שגיאה במערכת")
    }
  };
  const handleDeleteCategory = async (id) => {

    const response = await dispatch(DeleteCategory(id));
    console.log(response);
    console.log(response.type);
    try {
        if (response.type==="category/DeleteCategory/fulfilled") {
            alert("הקטגוריה הוסרה בהצלחה");
        } else {
            alert("שגיאה במחיקת הקטגוריה");
        }
    } catch (error) {
        alert("שגיאה בלתי צפויה במחיקה");
    }
}





return(
    <div>
    <Navbar />

    <TableContainer component={Paper}>
    <Table>
      <TableHead>
      <TableRow>
              <TableCell colSpan={2}>
                {isAdding ? (
                  <>
                  <TextField
                    label="שם קטגוריה חדשה"
                    variant="outlined"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCategory}
                    disabled={!categoryName} // נמנע מהוספה אם השדה ריק
                  >
                    <CheckIcon />
                  </Button>
                </>
                ) : (
                  <Fab color="primary" aria-label="add" onClick={() => setIsAdding(true)}>
                    <Tooltip title="הוסף קטגוריה">
                    <AddIcon />
                    </Tooltip>
                  </Fab>
                )}
              </TableCell>
            </TableRow>
        <TableRow>
          <TableCell>קטגוריה</TableCell>
          <TableCell align="right">פעולות</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categoriesList.map((category) => (
          <TableRow key={category.id}>
                <TableCell >
                {editedCategoryId === category.id ? (
                    <TextField
                    value={categoryName} // Ensure categoryName state is used
                    onChange={(e) => setCategoryName(e.target.value)} // Update state on change
                    />
                ) : (
                    category.categoryName
                )}
                </TableCell>
             <TableCell align="right">
                           
                {editedCategoryId === category.id ? (
                    <Button onClick={() => handleUpdateCategory(category.id ,categoryName)}>
                    <Tooltip title="עדכן">
                    <CheckIcon />
                    </Tooltip>

                    </Button>
                ) : (
                    <IconButton onClick={() => handleEditCategory(category.id)}>
                    <Tooltip title="עדכן קטגוריה">
                    <Edit />
                    </Tooltip>
                    </IconButton>
                )}
               
                <IconButton onClick={() => handleDeleteCategory(category.id)}>
                  <Tooltip title="מחק קטגוריה">
                  <Delete />
                  </Tooltip>
                </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>  
</div>
)
}
