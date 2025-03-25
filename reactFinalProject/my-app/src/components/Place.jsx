
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { GetPlaceById } from '../slice/placeSlice';
import { AddReview ,GetAllReviews} from '../slice/reviewsSlice';
// import {GetUserIdByName} from '../slice/userSlice';
import Rating from '@mui/material/Rating';
import { Grid, Card, CardMedia, CardContent,CardHeader ,Avatar } from '@mui/material';
import Navbar from './Navbar';
import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';





export default function Place() {
  const { placeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.userDetails.user);
  const place=useSelector(state=>state.placeDetails.selectedPlace);
  const reviewsList = useSelector(state =>state.reviewsDetails.reviews);
  const [content ,setContent]=useState('');
  const [userName, setUserName] = useState(currentUser?.userName || ''); // Use stored username or default to blank
  const [isOpen, setIsOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);


  useEffect(() => {
    try{
    const response= dispatch(GetPlaceById(placeId))
    if (response.type.match('place/GetPlaceById/fulfilled')) {   
    console.log(response);
    }
    }catch(error){
      console.log(error);
    }
    }, [dispatch]);

    useEffect(() => {
      try{
      const response=  dispatch(GetAllReviews(placeId))
      console.log(response);
      
      }catch(error){
        console.log(error);
      }
      }, [dispatch]);



      const handleAddComment = async (e) => {
        e.preventDefault();
        if (!content) {
          alert('אנא הכנס תוכן לתגובה שלך');
          return;
        }
    
        const newReview = {
          place:place,
          userName, 
          reviewText: content,
          rating: reviewRating
        };
    
        try {
         const response= await dispatch(AddReview(newReview));
          setContent(''); // Clear input after successful submission
          alert('התגובה נוספה בהצלחה!');
          setIsOpen(false);
        } catch (error) {
          console.error(error);
          alert('שגיאה במערכת. אנא נסה/י שוב מאוחר יותר.');
        }
      };

  const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;  /* Increased padding for better spacing */
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  width:700px;
`;

// PlaceImage with adjustments for larger size and rounded corners
const PlaceImage = styled.img`
  width: 400px;  /* Increased width for larger image */
  height: 400px;  /* Set height equal to width for square aspect ratio */
  object-fit: cover;
  border-radius: 20%;  /* Rounded corners for a smooth look */
`;

// PlaceDetails with increased padding for better separation
const PlaceDetails = styled.div`
  background-color: #f0f0f0;
  padding: 25px;  /* Increased padding for better spacing */
  border: 1px solid #ddd;
  border-radius: 5px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;
const StyledCommentList = styled(List)`
padding: 16px;
background-color: #f9f9f9;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledCommentItem = styled(ListItemButton)`
display: flex;
align-items: center;
padding: 12px 16px;
border-bottom: 1px solid #eee;
&:hover {
  background-color: #f5f5f5;
}
`;

const StyledCommentAvatar = styled(ListItemAvatar)`
min-width: 40px;
margin-right: 16px;
`;

  return (
    <div>
      <Navbar />

      {place ? (
        <>
          <PlaceImage src={`data:image/jpeg;base64,${place.image}`} alt={place.placeName} />
          <PlaceDetails>
            <h2>{place.placeName}</h2>
            <p>כתובת: {place.address}</p>
            <p>טלפון: {place.phoneNumber}</p>
            <p>אימייל: {place.email}</p>
            <p>תיאור: {place.description}</p>
            <p>סטטוס מקום: {place.status}</p>
            <p>דירוג: {place.averageRating}</p>
            {place.link && (
            <div>
              <a href={place.link} target="_blank" rel="noopener noreferrer">
                <Button>הזמן עכשיו</Button>
              </a>
              
            </div>
          )}
          </PlaceDetails>
      
         
           
            <Button onClick={() => {
            if (currentUser) {
              setIsOpen(true);
            } else {
              navigate("/Login");
            }
          }}>
           
              הוספת תגובה
            </Button>
       
             {isOpen ? (
                 <div>
                   <form onSubmit={handleAddComment}>
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
                      <Rating
                value={reviewRating}
                onChange={(e, newValue) => setReviewRating(newValue)}
                precision={0.5}
                sx={{ mb: 2 }}
              />
                  <TextField
                  id="outlined-multiline-flexible"
                  label="תוכן התגובה"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  name='content'
                  maxRows={4}
                  onChange={(e) => setContent(e.target.value)}
                   />
                   <Button onClick={handleAddComment}>אישור</Button>
                   </form>
                   </div>
                   
             ):(<></>)}

          <Grid item xs={12} md={6} lg={4}>
          <StyledCommentList>
      {reviewsList.map((review) => (
        <StyledCommentItem key={review.id}>
          <StyledCommentAvatar>
                <Avatar>
          <AccountCircle />
        </Avatar>
          </StyledCommentAvatar>
          <ListItemText
            primary={review.userName}
            secondary={
              <div>
                <Rating value={review.rating} readOnly precision={0.2} />
                <br />
                {review.reviewText}
              </div>
            }
          />
        </StyledCommentItem>
      ))}
    </StyledCommentList>
      </Grid>
      </>
      ) : (
        <p>טוען פרטים על המקום...</p>
      )}
    </div>

  );
}
