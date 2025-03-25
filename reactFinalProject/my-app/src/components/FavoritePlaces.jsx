import React ,{ useState ,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography ,IconButton} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {  Delete} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { GetAllFavoritePlaces,DeleteFavoritePlace } from '../slice/favoritePlaceSlice';

export default function FavoritePlaces(){
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.userDetails.user);
  const favoritePlaces = useSelector(state => state.favoritePlaceDetails.favoritePlaces);
  
  const handlePlaceClick = (placeId) => {
    navigate(`/Place/${placeId}`); // Navigate to Place component with place ID
  }; 
  
  useEffect(() => {
    try{
    const response= dispatch(GetAllFavoritePlaces(currentUser.id))
    console.log(response);
    
    }catch(error){
      console.log(error);
    }
    }, [dispatch]);

  const handleDeletePlace=(placeId)=>{
    console.log(placeId);
    try{
    const response=dispatch(DeleteFavoritePlace(placeId))
    console.log(response);
    
    alert("המקום הוסר בהצלחה")
} catch (error) {
  alert("שגיאה בלתי צפויה במחיקה");
}
  }

 

  return (
      <>
      <Navbar />
      {currentUser ?(
        <>
      <Grid container spacing={2} className="places-container">
        {favoritePlaces && Array.isArray(favoritePlaces) ? (
          favoritePlaces.map((favoritePlace) => (
            <Grid item key={favoritePlace.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '250px', width: '400px', position: 'relative' }} // Set cursor to 'pointer' on hover
                
                onMouseOver={() => {
                  // Increase image height and width on hover
                  const card = document.querySelector(`#card-${favoritePlace.id}`);
                  if (card) {
                    card.style.height = '300px';
                    card.style.width = '420px';
                  
                  }
                }}
                onMouseOut={() => {
                  // Reset image height and width on mouseout
                  const card = document.querySelector(`#card-${favoritePlace.id}`);
                  if (card) {
                    card.style.height = '270px';
                    card.style.width = '400px';
                 
                  }
                }}
                id={`card-${favoritePlace.id}`} // Unique ID for hover effect targeting
              >
                
                <CardMedia
                
                  component="img"
                  height="160"
                  image={`data:image/jpeg;base64,${favoritePlace.image}`} // Assuming the image is a JPEG
                  alt={favoritePlace.name}
                  
                />
                <IconButton onClick={() => {
                    handleDeletePlace(favoritePlace.id);
                  }}
                   
                 sx={{ position: 'absolute', top: 10, right: 10 ,zIndex: 1}} 
                  className="favorite-icon" >
                  <Tooltip title="הסר ממועדפים">
                    <Delete />
                  </Tooltip>
                </IconButton>
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {favoritePlace.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {favoritePlace.placeName} {/* Update description if available */}
                  </Typography>
                  <button onClick={() => handlePlaceClick(favoritePlace.id)}>לפרטים נוספים</button>
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
    ): (
      <Grid item xs={12}>
      <Typography variant="h6" align="center">
       אין משתמש מחובר
      </Typography>
    </Grid>
    )
     }
</>
);
}