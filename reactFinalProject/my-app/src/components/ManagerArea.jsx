import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch} from 'react-redux';
import Navbar from '../components/Navbar';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


export default function ManagerArea(){
    const dispatch=useDispatch();
    const navigate = useNavigate();




return(
    <>
    <Navbar />
    <div>
  
    <ul>
    <li><button onClick={() => navigate('/CategoryManagement')} >קטגוריות</button></li> 
    <li><button onClick={() => navigate('/AreaManagement')} >אזורים</button></li>       
    <li><button onClick={() => navigate('/PlacesManagement')} >מקומות</button></li>       
      
        </ul>
      
      </div>
      </>
)
}