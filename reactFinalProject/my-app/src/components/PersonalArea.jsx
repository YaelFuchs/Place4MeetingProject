import React ,{ useState ,useEffect } from 'react'
import {useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, UpdateUser, DeleteUser,GetImageByUserId } from '../slice/userSlice';
import { Grid,Card,CardContent,Typography,IconButton,Avatar,Button,Modal,Box,TextField,} from '@mui/material';
import { Delete, Logout } from '@mui/icons-material'; 
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/Navbar';




export default function PersonalArea(){

  //עדכון פרטי משתמש
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const currentUser = useSelector(state => state.userDetails.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('')
  const [image,setImage]=useState('');

  
    

   const handleUpdateUser = async (e) => {
    e.preventDefault();
    try{
      const img=await dispatch(GetImageByUserId(currentUser.id))
        console.log(img.payload); 
        const originalPath = img.payload; 

      const newPath = originalPath.replace(/\\/g, "\\\\");
        setImage(newPath)
    }catch(err){
        alert("בעיה")
    }
    const updatedUserData ={
      ...currentUser,
      password: password? password :currentUser.password,
      email: email? email: currentUser.email,
      phone: phone? phone: currentUser.phone,
      image: image, // Initial image URL
    }
    try {
     const update=await dispatch(UpdateUser({id:updatedUserData.id,user:updatedUserData,image:imageFile}))
     if(update.status===200){
      alert("העדכון עבר בהצלחה")
      setIsEditing(false);
     }
     else{
      alert("בעיה בשליחת הנתונים")
     }
    } catch (error) {
      alert("תקלה במערכת")
    }
  };

 
    const handleLogout = () => {
        dispatch(logout()); 
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const deleteId = currentUser.id;

    const response = await dispatch(DeleteUser(deleteId));
    console.log(response);
    console.log(response.type);
    try {
        if (response.type==="user/DeleteUser/fulfilled") {
            alert("חשבונך הוסר בהצלחה");
            navigate('/Login');
        } else {
            alert("שגיאה במחיקת החשבון");
        }
    } catch (error) {
        alert("שגיאה בלתי צפויה במחיקה");
    }
    handleCloseDelete();
};





return (     

  < div>
    <Navbar />

  {currentUser ? (
    <>
       {/* User information section */}
       <Grid container spacing={2}>
            {/* Left side: Image and fields or edit form */}
             <Grid item xs={8}>
             {isEditing ? (
                // <Modal open={isEditing} onClose={() => setIsEditing(false)}>
                  // <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    // <Typography variant="h6">עדכון פרופיל</Typography>
                    <form onSubmit={handleUpdateUser}>
                      <Avatar sx={{ width: 200, height: 200, marginLeft:40}} 
                      src={`data:image/jpeg;base64,${currentUser.image}`} alt="תמונת פרופיל" />

                      {/* Edit form fields */}
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="שם משתמש"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={currentUser.userName}
                    disabled // הוספת ה-prop 'disabled'
                  />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמה"
                    id="password"
                    defaultValue={currentUser.password}  
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="אימייל"
                    type="email"
                    id="email"
                    defaultValue={currentUser.email}  
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="טלפון"
                    type="tel"
                    id="phone"
                    defaultValue={currentUser.phone}  
                    onChange={(e) => setPhone(e.target.value)}
                  />
                              
                    <Button type="submit" variant="contained" color="primary">
                      אישור 
                    </Button>
                    </form>
                    // </Box>
                    // </Modal>
        ) : (
                <>
                  <Avatar sx={{ width: 200, height: 200, marginLeft:40}} src={`data:image/jpeg;base64,${currentUser.image}`} alt="תמונת פרופיל" />
                  {/* User information fields */}
                  <TextField
                    disabled
                    label="שם משתמש"
                    value={currentUser.userName}
                    fullWidth
                    margin="normal"
                  />
                    <TextField
                      disabled
                      label="סיסמא "
                      value={currentUser.password}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      disabled
                      label="טלפון "
                      value={currentUser.phone}
                      fullWidth
                      margin="normal"
                    />
                  <TextField
                    disabled
                    label="דואר אלקטרוני"
                    value={currentUser.email}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}
            </Grid>
            {/* Right side: Buttons (always displayed) */}
            <Grid item xs={3}>
                
              <Button variant="contained" color="primary" fullWidth  sx={{maxWidth: 150,marginBottom: 3,marginLeft:20,marginTop:20}} // מוסיף רווח תחתון בין כפתורים}}
               onClick={() =>setIsEditing(true)}>
                <EditIcon /> עריכה
              </Button>
              <Button variant="contained" color="primary" fullWidth   sx={{maxWidth: 150,marginBottom: 3,marginLeft:20}}
               onClick={() => handleDeleteUser}>
              <Delete /> מחיקה
              </Button>
              <Button variant="contained" color="primary" fullWidth  sx={{maxWidth: 150,marginBottom: 3,marginLeft:20}}
               onClick={() => handleLogout}>
              <Logout /> התנתקות
              </Button>
              <Button variant="contained" color="primary" fullWidth  sx={{maxWidth: 150,marginBottom: 3,marginLeft:20}}
              onClick={() => navigate('/FavoritePlaces')}>
              <FavoriteIcon/> מועדפים
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {/* Handle no user case */}
          <p>אין משתמש מחובר</p>
        </>
      )}
    </div>
  );
}

  