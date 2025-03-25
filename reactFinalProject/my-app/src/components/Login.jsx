import React ,{ useState  } from 'react'
import {useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {login} from '../slice/userSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Box, Container, TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Login(){
const dispatch=useDispatch();
const [userName,setUserName]=useState('');
const [password,setPassword]=useState('');
// const [manager ,setManager]=useState(null);
const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate();
const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userName || !password) {
    alert("שדות אלו הם חובה, נא למלא!");
    return;
  }

  const newUser = {
    userName,
    password,
    email: null,
    phone:null,
    image:null

  };

  try {
    const response = await dispatch(login(newUser)); 
    localStorage.setItem("manager", "false");

    if (response.type.match('user/login/fulfilled')) {
      if(response.payload.userName==='yaelfs'&& response.payload.password==='yael2005'){
        localStorage.setItem("manager", "true");

      }     
      alert("התחברות מוצלחת!");
      navigate('/')
    } else {
      // Handle error based on response.error.status
      if (response.error.message.match("Rejected")) {
        if(response.payload.status===400){
        alert("סיסמה שגויה");
       } else  {
        alert("משתמש לא נמצא");
        navigate("/Signup");
       }
      } else {
        alert("שגיאה בהתחברות");
      }
    }
  } catch (error) {
    alert("שגיאה לא צפויה"); // Provide user-friendly message
  }
};





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
          LOGIN
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
              onChange={(e) => setUserName(e.target.value)}           />
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type={showPassword ? 'text' : 'password'}
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
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
          >
              התחברות
          </Button>
      </Box>
  </Box>
</Container>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>user name</label>
    //     <input 
    //       type="text" 
    //       value={userName} 
    //       onChange={(e) => setUserName(e.target.value)} 
    //     />
    //   </div>
    //   <div>
    //     <label>password</label>
    //     <input 
    //       type="password" 
    //       value={password} 
    //       onChange={(e) => setPassword(e.target.value)} 
    //     />
    //   </div>
      
    //   <button type="submit">Login</button>
    // </form>
  );


}
