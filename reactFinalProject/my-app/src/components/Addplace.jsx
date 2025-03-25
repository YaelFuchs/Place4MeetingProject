import React ,{ useState ,useEffect } from 'react'
import {useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { GetAllCategory } from '../slice/categorySlice';
import { GetAllArea } from '../slice/areaSlice';
import Navbar from './Navbar';
import {AddPlace  } from '../slice/placeSlice';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import {Button,TextField,Box,FormControl,InputLabel,Select,MenuItem,Input,FormHelperText,IconButton,Avatar,Container} from '@mui/material';

export default function Addplace(){

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [placeName,setPlaceName]=useState('');
    const [address,setAddress]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const [email,setEmail]=useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [description,setDescription]=useState('');
    const [image,setImage]=useState('');
    const [openingHours,setOpeningHours]=useState('');
    const [status,setStatus]=useState('');
    const [link,setLink]=useState('');
    const [imageFile,setImageFile]=useState(null);
    const categoriesList=useSelector(state=> state.categoryDetails.categories)
    const areaList=useSelector(state=>state.areaDetails.areas)


    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const response = await dispatch(GetAllCategory());
          console.log('Fetched places:', response);
          // Handle success, update state, etc.
        } catch (error) {
          console.error('Error fetching places:', error);
          // Handle errors, display error messages, etc.
        }
      };
    
      fetchPlaces();
    }, [dispatch]);

    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const response = await dispatch(GetAllArea());
          console.log('Fetched places:', response.payload);
          // Handle success, update state, etc.
        } catch (error) {
          console.error('Error fetching places:', error);
          // Handle errors, display error messages, etc.
        }
      };
      fetchPlaces();
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(GetAllCategory());
    //   }, [dispatch]);
    //   useEffect(() => {
    //     dispatch(GetAllArea());
    //   }, [dispatch]);


      const handleAddPlace =async(e) => {
        e.preventDefault();
        if(!placeName){
            alert("שדה חובה נא למלא!")
        }
       
        const newPlace={
            placeName: placeName,
            address:address ,
            phoneNumber:phoneNumber,
            email: email,
            image: image,
            category:selectedCategory ,
            area:selectedArea ,
            description:description ,
            openingHours:openingHours ,
            status: status,
            link:link
        }
        try{
            const response= await dispatch(AddPlace({newPlace,imageFile}))
            console.log(response);
            alert("המקום נוסף בהצלחה")
            navigate('/PlacesManagement')
        }catch(error){
            alert("שגיאה במערכת")
        }
    };
    return(
        <div >
     <Container maxWidth="sm">

        <div>
        <label htmlFor="image">תמונה</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <TextField
       margin="normal"
       required
       fullWidth
       name="placeName"
       label="שם המקום"
       id="placeName"
       onChange={(e) => setPlaceName(e.target.value)}
       />

       <TextField
       margin="normal"
       required
       fullWidth
       name="address"
       label="כתובת"
       id="address"
       onChange={(e) => setAddress(e.target.value)}
       />

       <TextField
       margin="normal"
       required
       fullWidth
       name="phoneNumber"
       label="מספר טלפון"
       id="phoneNumber"
       onChange={(e) => setPhoneNumber(e.target.value)}
       />

       <TextField
       margin="normal"
       fullWidth
       name="email"
       label="אימייל"
       id="email"
       onChange={(e) => setEmail(e.target.value)}
       />
        <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
        <Select 
        sx={{ minWidth: 550 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCategory} // ודא ש-selectedCategory מכיל את האובייקט הנבחר
        onChange={(event) => setSelectedCategory(event.target.value)}
        >
        {categoriesList.map((category) => (
            <MenuItem key={category.id} value={category}>
            {category.categoryName}
            </MenuItem>
        ))}
        </Select>
        <InputLabel id="demo-simple-select-label">אזור</InputLabel>
        <Select
         sx={{ minWidth: 550 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedArea} // ודא ש-selectedCategory מכיל את האובייקט הנבחר
        onChange={(event) => setSelectedArea(event.target.value)}

        >
        {areaList.map((area) => (
            <MenuItem key={area.id} value={area}>
            {area.areaName}
            </MenuItem>
        ))}
        </Select>

       <TextField
       margin="normal"
       fullWidth
       multiline
       rows={4}
       name="description"
       label="תיאור"
       id="description"
       onChange={(e) => setDescription(e.target.value)}
       />

       <TextField
       margin="normal"
       fullWidth
       name="openingHours"
       label="שעות פתיחה"
       id="openingHours"
       onChange={(e) => setOpeningHours(e.target.value)}
       />

       <TextField
       margin="normal"
       fullWidth
       name="status"
       label="סטטוס"
       id="status"
       onChange={(e) => setStatus(e.target.value)}
       />

       <TextField
       margin="normal"
       fullWidth
       name="link"
       label="קישור"
       id="link"
       onChange={(e) => setLink(e.target.value)}
       />
   <Button onClick={handleAddPlace}>הוספה</Button>
     </Container>
   </div>
    )
}