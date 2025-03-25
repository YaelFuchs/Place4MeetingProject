import React ,{ useState ,useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch ,useSelector } from 'react-redux'
import Navbar from '../components/Navbar';
import { GetAllArea, AddArea,DeleteArea,UpdateArea} from '../slice/areaSlice';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Edit, Delete} from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';




export default function AreaManagement() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAreaId, setEditedAreaId] = useState(null); 
    const [areaName,setAreaName]=useState('');
    const [isAdding, setIsAdding] = useState(false);
    const areaList=useSelector(state=>state.areaDetails.areas)
    useEffect(() => {
        dispatch(GetAllArea());
      }, [dispatch]);
    
      const handleAddArea =async(e) => {
        e.preventDefault();
        setIsEditing(true);
        if(!areaName){
            alert("שדה חובה נא למלא!")
        }
        const newArea={
            areaName:areaName
        }
        try{
            const response= await dispatch(AddArea(newArea))
            console.log(response);
            alert("האזור נוסף בהצלחה")
            setIsAdding(false);
            setAreaName("");
        }catch(error){
            alert("שגיאה במערכת")
        }
  };
  const handleEditArea = (id) => {
    setEditedAreaId(id);
    setIsEditing(true);
  };

  // פונקציה לעריכה של קטגוריה
  const handleUpdateArea = async(Id,areaName) => {
    console.log(Id);
    console.log(areaName);
    if(!areaName){
        alert("שדה חובה נא למלא!")
    }
    const updateArea={
        id:Id,
        areaName:areaName
    }
    console.log(updateArea);
    
    try{
        const response= await dispatch(UpdateArea({id:updateArea.id, area:updateArea}))
        console.log(response);
        if (response.type==="area/UpdateArea/fulfilled") {
        alert("האזור עודכנה בהצלחה");
        setIsEditing(false);
        setEditedAreaId(null);


        }
        else{
            alert("שגיאה בעדכון");
        }
    }catch(error){
        alert("שגיאה במערכת")
    }
  };
  const handleDeleteArea = async (id) => {

    const response = await dispatch(DeleteArea(id));
    console.log(response);
    console.log(response.type);
    try {
        if (response.type==="area/DeleteArea/fulfilled") {
            alert("האזור הוסרה בהצלחה");
        } else {
            alert("שגיאה במחיקת האזור");
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
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddArea}
                    disabled={!areaName} // נמנע מהוספה אם השדה ריק
                  >
                    <CheckIcon />
                  </Button>
                </>
                ) : (
                  <Fab color="primary" aria-label="add" onClick={() => setIsAdding(true)}>
                    <Tooltip title="הוסף אזור">
                    <AddIcon />
                    </Tooltip>
                  </Fab>
                )}
              </TableCell>
            </TableRow>
        <TableRow>
          <TableCell>אזור</TableCell>
          <TableCell align="right">פעולות</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {areaList.map((area) => (
          <TableRow key={area.id}>
                <TableCell >
                {editedAreaId === area.id ? (
                    <TextField
                    value={areaName} // Ensure AreaName state is used
                    onChange={(e) => setAreaName(e.target.value)} // Update state on change
                    />
                ) : (
                  area.areaName
                )}
                </TableCell>
             <TableCell align="right">
                           
                {editedAreaId === area.id ? (
                    <Button onClick={() => handleUpdateArea(area.id ,areaName)}>
                    <Tooltip title="עדכן">
                    <CheckIcon />
                    </Tooltip>

                    </Button>
                ) : (
                    <IconButton onClick={() => handleEditArea(area.id)}>
                    <Tooltip title="עדכן אזור">
                    <Edit />
                    </Tooltip>
                    </IconButton>
                )}
               
                <IconButton onClick={() => handleDeleteArea(area.id)}>
                  <Tooltip title="מחק אזור">
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
