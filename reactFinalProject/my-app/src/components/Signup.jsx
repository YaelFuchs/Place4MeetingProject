import React ,{ useState } from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux'
import {signup} from '../slice/userSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Box, Container, TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Signup(){
const dispatch=useDispatch();
const [userName,setUserName]=useState('');
const [password,setPassword]=useState('');
const [email,setEmail]=useState('');
const [phone,setPhone]=useState('');
const [image,setImage]=useState(null);
const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);


const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!userName ||!password ||!email ||!phone ){
        alert("שדות אלו הם חובה, נא למלא!");
        return;
    }
    const newUser = {
        userName: userName,
        password: password,
        email: email,
        phone:phone
       
    };
    
    
    try {
      const response =await dispatch(signup({newUser,image}))//החזרת תגובה מהפונקציה שבSLICE
      console.log(response);
      if (response.type.match('user/signup/fulfilled')) {     
        alert("ההרשמה עברה בהצלחה");
        navigate("/Login");
      } else {
        // Handle error based on response.error.status
        if (response.error.message.match("Rejected")) {
          if(response.payload.status===409){
          alert("שם המשתמש כבר קיים ");       
        } else {
          alert("שגיאה בהרשמה");
        
      }}}
    } catch (error) {
      alert("שגיאה לא צפויה"); // Provide user-friendly message
    }
    // try{
    //     const response=await signupUser(newUser);
    //     dispatch(signup({
    //       user:response.user,
    //       isConnected: true
    //        }))// עדכון ה-state ב-Redux  עם פרטי המשתמש והסטטוס
    //     navigate('/HomePage');
    // }
    // catch(err){
    //   if (err.response) {
    //     if (err.response.status === 409) {
    //         alert('שם המשתמש כבר קיים')
    //     } 
    // } else {
    //     console.error("Login error", err);
    //     alert("שגיאה במערכת, אנא נסו מאוחר יותר.");

    }

    



    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();
  
    // You might want to add password visibility toggle (optional)
    // let showPassword = false; // State for password visibility
  
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="שם משתמש"
              name="username"
              autoComplete="username"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type={showPassword ? 'text' : 'password'} // Optional password visibility
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
           <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="אימייל"
            type="email"
            id="email"
            autoComplete="email"
            value={email}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div>
            <label htmlFor="image">תמונה</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            הרשמה
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
  