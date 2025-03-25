import React ,{ useState ,useEffect } from 'react'
import {useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { GetAllCategory } from '../slice/categorySlice';
import { GetAllArea } from '../slice/areaSlice';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import {UpdatePlace ,GetPlaceById ,GetImageByPlaceId } from '../slice/placeSlice';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import {Button,TextField,Box,FormControl,InputLabel,Select,MenuItem,Input,FormHelperText,IconButton,Avatar,Container} from '@mui/material';

export default function Updateplace(){
    const { placeId } = useParams();
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [placeName,setPlaceName]=useState('');
    const [address,setAddress]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const [email,setEmail]=useState('');
    const [category, setCategory] = useState(''); 
    const [area, setArea] = useState(''); 
    const [description,setDescription]=useState('');
    const [image,setImage]=useState('');
    const [imageT,setImageT]=useState('');
    const [openingHours,setOpeningHours]=useState('');
    const [status,setStatus]=useState('');
    const [link,setLink]=useState('');
    const place=useSelector(state=>state.placeDetails.selectedPlace);
    const categoriesList=useSelector(state=> state.categoryDetails.categories)
    const areaList=useSelector(state=>state.areaDetails.areas)

    useEffect(() => {
      try{
      const response= dispatch(GetPlaceById(placeId))
      console.log(response);
      
      }catch(error){
        console.log(error);
      }
      }, []);
    useEffect(() => {
        dispatch(GetAllCategory());
      }, [dispatch]);
      useEffect(() => {
        dispatch(GetAllArea());
      }, [dispatch]);

      console.log(place);
      console.log(placeId);
      
         
const handleUpdatePlace = async(e) => {
    e.preventDefault();
    try{
      const img=await dispatch(GetImageByPlaceId(placeId))
        console.log(img.payload); 
        const originalPath = img.payload; 

      const newPath = originalPath.replace(/\\/g, "\\\\");
        setImageT(newPath)
    }catch(err){
        alert("בעיה")
    }
     const updatedPlaceData ={
        id: placeId ,
        placeName: placeName? placeName :place.placeName,
        address:address?address: place.address ,
        phoneNumber:phoneNumber? phoneNumber:place.phoneNumber,
        email: email? email: place.email,
        image: imageT ,
        category:category?category:place.categoy ,
        area:area?area:place.area ,
        description:description?description:place.description ,
        openingHours:openingHours?openingHours:place.openingHours ,
        status: status?status:place.status,
        link:link?link:place.link
     }
     try {
      const update=await dispatch(UpdatePlace({id:placeId,user:updatedPlaceData}))
      if(update.status===200){
       alert("העדכון עבר בהצלחה")
      navigate('/PlacesManagement')
      }
      else{
       alert("בעיה בשליחת הנתונים")
      }
     } catch (error) {
       alert("תקלה במערכת")
     }
   };
   return (
        <div>
          <Navbar/>
          <Container maxWidth="sm">
          {place ? (
          <div>
          <Avatar sx={{ width: 200, height: 200, marginLeft:20}} 
         src={`data:image/jpeg;base64,${place.image}`} alt="תמונת מקום" />
        <TextField
         margin="normal"
         required
         fullWidth
         name="placeName"
         label="שם המקום"
         id="placeName"
         defaultValue={place.placeName}
         onChange={(e) => setPlaceName(e.target.value)}
         />

         <TextField
         margin="normal"
         required
         fullWidth
         name="address"
         label="כתובת"
         id="address"
         defaultValue={place.address}
         onChange={(e) => setAddress(e.target.value)}
         />

         <TextField
         margin="normal"
         required
         fullWidth
         name="phoneNumber"
         label="מספר טלפון"
         id="phoneNumber"
         defaultValue={place.phoneNumber}
         onChange={(e) => setPhoneNumber(e.target.value)}
         />

         <TextField
         margin="normal"
         fullWidth
         name="email"
         label="אימייל"
         id="email"
         defaultValue={place.email}
         onChange={(e) => setEmail(e.target.value)}
         />
            <Grid container spacing={2}> {/* Use Grid container for responsive layout */}
              <Grid item xs={12}> {/* Full width for each Select */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={place.category}
                    label="קטגוריה"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoriesList.map((category) => (
                      <MenuItem key={category.id} style={{ textDecoration: 'none', color: 'black' }}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}> {/* Full width for each Select */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">אזור</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={place.area}
                    label="אזור"
                    onChange={(e) => setArea(e.target.value)}
                  >
                    {areaList.map((area) => (
                      <MenuItem key={area.id} style={{ textDecoration: 'none', color: 'black' }}>
                        {area.areaName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>
                </Grid>

              

         <TextField
         margin="normal"
         fullWidth
         multiline
         rows={4}
         name="description"
         label="תיאור"
         id="description"
         defaultValue={place.description}
         onChange={(e) => setDescription(e.target.value)}
         />

         <TextField
         margin="normal"
         fullWidth
         name="openingHours"
         label="שעות פתיחה"
         id="openingHours"
         defaultValue={place.openingHours}
         onChange={(e) => setOpeningHours(e.target.value)}
         />

         <TextField
         margin="normal"
         fullWidth
         name="status"
         label="סטטוס"
         id="status"
         defaultValue={place.status}
         onChange={(e) => setStatus(e.target.value)}
         />

         <TextField
         margin="normal"
         fullWidth
         name="link"
         label="קישור"
         id="link"
         defaultValue={place.link}
         onChange={(e) => setLink(e.target.value)}
         />
     <Button onClick={handleUpdatePlace}>שמור</Button>
     <Button onClick={() => navigate('/PlacesManagement')}>בטל</Button>
     </div>
     ):(
      <p>Loading...</p>
     )}
     </Container>
     </div>
     
   )
}