// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { GetPlaceById } from '../slice/placeSlice';
// // import styled from '@emotion/styled'; // במקום import { makeStyles } from '@mui/styles';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';// לסמן כאהבתי
// // import FavoriteIcon from '@mui/icons-material/Favorite'; // מסומן כאהבתי
// // import AddCommentIcon from '@mui/icons-material/AddComment'; // הוספת תגובה
// // import CheckIcon from '@mui/icons-material/Check'; // אישור הוספת תגובה 
// // import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import Rating from '@mui/material/Rating';
// // import Typography from '@mui/material/Typography';



// // const PlaceContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   margin: 20px;
// // `;

// // const PlaceImage = styled.img`
// //   width: 300px;
// //   height: 200px;
// //   object-fit: cover;
// //   border-radius: 5px;
// // `;

// // const PlaceDetails = styled.div`
// //   margin: 20px;
// // `;

// // const Button = styled.button`
// //   background-color: #4CAF50;
// //   color: white;
// //   padding: 15px 32px;
// //   text-align: center;
// //   text-decoration: none;
// //   display: inline-block;
// //   font-size: 16px;
// //   border: none;
// //   cursor: pointer;
// // `;


// // export default function Place() {
// //   const { placeId } = useParams();
// //   const dispatch = useDispatch();
// //   const [place, setPlace] = useState(null);

// //   useEffect(() => {
// //     const fetchPlace = async () => {
// //       const fetchedPlace = await dispatch(GetPlaceById(placeId));
// //       setPlace(fetchedPlace.payload); // Assuming GetPlaceById returns an action with a payload
// //     };

// //     fetchPlace();
// //   }, [placeId, dispatch]);


// //   return (
// //     <div>
// //       {place ? (
// //         <PlaceContainer>
// //           <PlaceImage src={`data:image/jpeg;base64,${place.image}`} alt={place.placeName} />
// //           <PlaceDetails>
// //           <h2>{place.placeName}</h2>
// //              <p>כתובת: {place.address}</p>
// //              <p>טלפון: {place.phoneNumber}</p>
// //              <p>אימייל: {place.email}</p>
// //              <p>תיאור: {place.description}</p>
// //              <p>סטטוס מקום: {place.status}</p>
// //              <p>שעות פתיחה:</p>
// //              <p>
// //               {place.openingHours}  
           
// //             </p>
// //           </PlaceDetails>
// //           {place.link && (
// //             <div>
// //               <a href={place.link} target="_blank" rel="noopener noreferrer">
// //                 <Button>הזמן עכשיו</Button>
// //               </a>
// //             </div>
// //           )}
// //         </PlaceContainer>
// //       ) : (
// //         <p>Loading place details...</p>
// //       )}
// //     </div>
// //   );
// // }


// // <TextField
// //                             label="Profile Picture"
// //                             type="file"
// //                             name="image"
// //                             onChange={handleFileChange}
// //                             fullWidth
// //                             inputProps={{ accept: 'image/*' }}
// //                             sx={fieldStyle}
// //                             InputProps={{ startAdornment: <InputAdornment position="start"><PhotoCamera /></InputAdornment> }}
// //                             error={!!errors.image}
// //                             helperText={errors.image}
// //                         />

// // export const signupNewVolunteer = createAsyncThunk(
// //     'volunteers/signupNewVolunteer',
// //     async (
// //         { volunteerData, image }: { volunteerData: VolunteerSignup; image?: File | undefined },
// //         thunkAPI
// //     ) => {
// //         try {
// //             const formData = new FormData();
// //             if (!image) {
// //                 return await signupVolunteer(volunteerData);
// //             }
// //             formData.append(
// //                 'volunteer',
// //                 new Blob([JSON.stringify(volunteerData)], { type: 'application/json' })
// //             );
// //             formData.append('image', image);
// //             const response = await signupVolunteerImage(formData);
// //             return response;
// //         } catch (error) {
// //             const err = error as { status?: string };
// //             return thunkAPI.rejectWithValue({
// //                 status: err.status,
// //             });
// //         }
// //     }
// // );

// // export const signupVolunteerImage = async (formData: FormData): Promise<Volunteer> => {
// //     const response = await axios.post('volunteer/upload', formData, {
// //         headers: {
// //             'Content-Type': 'multipart/form-data',
// //         },
// //     });
// //     return response.data;
// // };

// {/* <IconButton onClick={handleCommentFormToggle}>
// <AddCommentIcon />
// </IconButton>
// {currentUser ? (
// <div>
// {/* Username display */}
// {/* <TextField
// id="username-display"
// label="שם משתמש"
// value={currentUser.username}
// disabled
// input={{
//   startAdornment: (
//     <InputAdornment position="start">
//       <AccountCircle />
//     </InputAdornment>
//   ),
// }}
// variant="standard"
// sx={{ mb: 1 }} // Added margin-bottom for spacing
// />


// <Collapse in={isCommentFormOpen} timeout="auto" unmountOnExit>
// <Box sx={{ height: "5vh", paddingBottom: "5vh" }}>
// <TextField
// label="הוסף תגובה"
// multiline
// rows={4}
// value={newComment}
// onChange={(e) => handleCommentChange(e.target.value)}
// sx={{ width: "20vw" }}
// />
// </Box>
// <Button variant="contained" onClick={handleSubmitComment}>
// שלח
// </Button>
// </Collapse>
// </div>
// ) : (
// <p>צריך להיות מחובר כדי להוסיף תגובה</p>
// )}

// {comments ?(
// <List>
// {comments.map((comment, index) => (
// <ListItem key={index}>
// <ListItemText primary={comment.text} />
// </ListItem>
// ))}
// </List>
// ):(
// <p>אין תגובות</p>
// )
// } */
// // } */}