import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetAllPlaces } from '../slice/placeSlice';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography,IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {AddFavoritePlace} from '../slice/favoritePlaceSlice';
import './H.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const placesList = useSelector(state => state.placeDetails.places); // Access the entire array
  const currentUser = useSelector(state => state.userDetails.user);
  const navigate = useNavigate(); // Use useNavigate for navigation


  useEffect(() => {
    dispatch(GetAllPlaces());
  }, []);

 const handlePlaceClick = (placeId) => {
    navigate(`/Place/${placeId}`); // Navigate to Place component with place ID
  }; 
  const handleAddToFavorites = async(place) => {

    const newFavoritePlace={
      place:place,
      users: currentUser
    }
    console.log(newFavoritePlace);
    try{
      
     const response= await dispatch(AddFavoritePlace(newFavoritePlace))
      console.log(response);
       if(response.error.message.match("Rejected")){
        alert("המקום סומן בעבר כמועדף")
      }
      else{
      alert("המקום נוסף בהצלחה")
      }
    }catch(err){
      alert("שגיאה במערכת")
      }
    };
   
  return (
    <>
      <Navbar />
      <Grid container spacing={2} className="places-container">
        {placesList && Array.isArray(placesList) ? (
          placesList.map((place) => (
            <Grid item key={place.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '250px', width: '400px', position: 'relative' }} // Set cursor to 'pointer' on hover
                
                onMouseOver={() => {
                  // Increase image height and width on hover
                  const card = document.querySelector(`#card-${place.id}`);
                  if (card) {
                    card.style.height = '300px';
                    card.style.width = '420px';
                  
                  }
                }}
                onMouseOut={() => {
                  // Reset image height and width on mouseout
                  const card = document.querySelector(`#card-${place.id}`);
                  if (card) {
                    card.style.height = '270px';
                    card.style.width = '400px';
                 
                  }
                }}
                id={`card-${place.id}`} // Unique ID for hover effect targeting
              >
                
                <CardMedia
                
                  component="img"
                  height="160"
                  image={`data:image/jpeg;base64,${place.image}`} // Assuming the image is a JPEG
                  alt={place.name}
                  
                />
              {currentUser ? (
                <IconButton onClick={() => {
                    handleAddToFavorites(place);
                  }}
                   
                 sx={{ position: 'absolute', top: 10, right: 10 ,zIndex: 1}} 
                  className="favorite-icon" >
                  <Tooltip title="הוסף למועדפים">
                    <FavoriteIcon />
                  </Tooltip>
                </IconButton>
                ):(<></>)}
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {place.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {place.placeName} {/* Update description if available */}
                  </Typography>
                  <button onClick={() => handlePlaceClick(place.id)}>לפרטים נוספים</button>
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