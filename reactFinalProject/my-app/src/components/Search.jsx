import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GetAllBySearch } from '../slice/placeSlice';
import styled from '@emotion/styled'; // במקום import { makeStyles } from '@mui/styles';

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const PlaceImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const PlaceDetails = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;


export default function  Search() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const placesList = useSelector(state=> state.placeDetails.places);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        console.log(search);       
        const response = await dispatch(GetAllBySearch({search}));
        console.log('Fetched places:', response.payload);
        // Handle success, update state, etc.
      } catch (error) {
        console.error('Error fetching places:', error);
        // Handle errors, display error messages, etc.
      }
    };
  
    fetchPlaces();
  }, [dispatch,search]);

  const handlePlaceClick = (placeId) => {
    navigate(`/Place/${placeId}`); // Navigate to Place component with place ID
  };

 



  return (
    <>
      <Navbar />
      <Grid container spacing={2} className="places-container">
        {placesList && Array.isArray(placesList) ? (
          placesList.map((place) => (
            <Grid item key={place.id} xs={12} sm={6} md={4} > 
              <Card onClick={() => handlePlaceClick(place.id)} style={{ height: '250px',width:'400px' }}> {/* Handle click here */}
              <CardMedia
              component="img"
               height="160"
              
              image={`data:image/jpeg;base64,${place.image}`} // Assuming the image is a JPEG
               alt={place.name}
               />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {place.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {place.placeName}  {/* Update description if available */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
            😔 לא נמצאו תוצאות מתאימות
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}


