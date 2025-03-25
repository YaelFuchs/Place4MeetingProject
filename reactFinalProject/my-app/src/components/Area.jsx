import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid, Card, CardMedia, CardContent, Typography,IconButton} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GetPlacesByAreaId } from '../slice/placeSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './H.css';


export default function  Area() {
  const { areaId } = useParams();
  console.log(areaId);
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const placesList = useSelector(state=> state.placeDetails.places);
  const currentUser = useSelector(state => state.userDetails.user);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await dispatch(GetPlacesByAreaId({areaId}));
        console.log('Fetched places:', response.payload);
        // Handle success, update state, etc.
      } catch (error) {
        console.error('Error fetching places:', error);
        // Handle errors, display error messages, etc.
      }
    };
  
    fetchPlaces();
  }, []);

  const handlePlaceClick = (placeId) => {
    navigate(`/Place/${placeId}`); // Navigate to Place component with place ID
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