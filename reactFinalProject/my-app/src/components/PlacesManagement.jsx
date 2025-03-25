import React ,{ useState ,useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch ,useSelector } from 'react-redux'
import Navbar from '../components/Navbar';
import { GetAllPlaces,AddPlace ,DeletePlace,UpdatePlace  } from '../slice/placeSlice';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import {Button,TextField,Box,FormControl,InputLabel,Select,MenuItem,Input,FormHelperText,IconButton,Avatar} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Edit, Delete } from '@mui/icons-material';








export default function PlacesManagement() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const placeList=useSelector(state=>state.placeDetails.places);
   


    useEffect(() => {
        dispatch(GetAllPlaces());
      }, [dispatch,placeList]); // Only re-run when dispatch changes

      const handleDeletePlace = async (id) => {

        const response = await dispatch(DeletePlace(id));
        console.log(response);
        console.log(response.type);
        try {
            if (response.type==="place/DeletePlace/fulfilled") {
                alert("המקום הוסר בהצלחה");
            } else {
                alert("שגיאה במחיקת המקום");
            }
        } catch (error) {
            alert("שגיאה בלתי צפויה במחיקה");
        }
    }
    

    
return (
<>
<Navbar/>
      
         <Grid container spacing={2} className="places-container">
           <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/Addplace')}
            startIcon={<AddIcon />}
          >
            הוספת מקום חדש
          </Button>
        </Grid>
        {placeList && Array.isArray(placeList) ? (
          placeList.map((place) => (
            <Grid item key={place.id} xs={12} sm={6} md={4}>
              <Card > {/* Handle click here */}
              <CardMedia
              component="img"
               height="160"
              image={`data:image/jpeg;base64,${place.image}`} // Assuming the image is a JPEG
               alt={place.placeName}
               />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {place.placeName} 
                  </Typography>
                  <IconButton onClick={() => navigate(`/Updateplace/${place.id}`)}>
                <Edit />
               </IconButton>
               <IconButton onClick={() => handleDeletePlace(place.id)}>
                <Delete />
            </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Loading places...
            </Typography>
          </Grid>
        )}   
      </Grid>
     
</>
);
}