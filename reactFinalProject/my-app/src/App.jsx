import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import PersonalArea from './components/PersonalArea';
import HomePage from './components/HomePage';
import Place from './components/Place';
import Bookings from './components/Bookings';
import Category from './components/Category';
import FavoritePlaces from './components/FavoritePlaces';
import Messages from './components/Messages' ;
import OpeningHours from './components/OpeningHours';
import OrderHistory from './components/OrderHistory';
import Reviews from './components/Reviews';
import NavbarTry from './components/NavbarTry';
import Area from './components/Area';
import UserUpdate from './components/UserUpdate';
import  Search  from './components/Search';
import ManagerArea from './components/ManagerArea'
import CategoryManagement from './components/CategoryManagement'
import PlacesManagement from './components/PlacesManagement'
import AreaManagement from './components/AreaManagement'
import Addplace from './components/Addplace';
import Updateplace from './components/Updateplace';
import { Route,Routes,BrowserRouter } from 'react-router-dom';




function App() {
  

  return (
    <>
    <BrowserRouter>   
    <Routes>
  
    <Route path="/" element={<HomePage/>} />
    <Route path="/Signup" element={<Signup/> }/>
    <Route path="/Login" element={<Login/> }/>
    <Route path="/PersonalArea" element={<PersonalArea/> }/>
    <Route path="/FavoritePlaces" element={<FavoritePlaces/>}/>
    <Route path="/OrderHistory" element={<OrderHistory/>}/>
    <Route path="/Place/:placeId" element ={<Place/>}/>
    <Route path='/Messages' element={<Messages/>}/>
    <Route path='/Category/:categoryId' element={<Category/>}/>
    <Route path='/Bookings' element={<Bookings/>}/>
    <Route path='/OpeningHours' element={<OpeningHours/>}/>
    <Route path='/Reviews' element={<Reviews/>}/> 
    <Route path='/NavbarTry' element={<NavbarTry/>}/>
    <Route path='/UserUpdate' element={<UserUpdate/>}/>
    <Route path='/Area/:areaId' element={<Area/>}/>
    <Route path='/Search/:search' element={<Search/>}/>
    <Route path='/ManagerArea' element={<ManagerArea/>}/>
    <Route path='/CategoryManagement' element={<CategoryManagement/>}/>
    <Route path='/PlacesManagement' element={<PlacesManagement/>}/>
    <Route path='/AreaManagement' element={<AreaManagement/>}/>
    <Route path='/Addplace'   element={<Addplace/>}/>
    <Route path='/Updateplace/:placeId'   element={<Updateplace/>}/>







    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


// import React from 'react';import './App.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import PersonalArea from './components/PersonalArea';
// import HomePage from './components/HomePage';
// import Place from './components/Place';
// import Bookings from './components/Bookings';
// import Category from './components/Category';
// import FavoritePlaces from './components/FavoritePlaces';
// import Messages from './components/Messages' ;
// import OpeningHours from './components/OpeningHours';
// import OrderHistory from './components/OrderHistory';
// import Reviews from './components/Reviews';
// import Layout from './components/Layout';
// // import NavbarTry from './components/NavbarTry';import Area from './components/Area';
// import UserUpdate from './components/UserUpdate';
//  // import { Route,Routes,BrowserRouter } from 'react-router-dom';
//  const router = createBrowserRouter(
//   [  {    path: "/",  
//       element: <Layout/>, 
//          children: [
//                 { path: "", element= <HomePage/> }, 
//                 { path: "Signup", element=<Signup />  },
//                 { path: "Login", element=<Login />  },
//                 { path: "PersonalArea", element=<PersonalArea />  },
//                 { path: "FavoritePlaces", element=<FavoritePlaces />  },
//                 { path: "OrderHistory", element=<HomePage />  },
//                 { path: "Place/:placeId", element=<Place />  },
//                 { path: "Messages", element=<Messages />  },
//                 { path: "Category/:categoryId", element=<Category />  },
//                 { path: "OpeningHours", element=<OpeningHours />  },
//                 { path: "Reviews", element=<Reviews />  },
//                 { path: "UserUpdate", element=<UserUpdate />  },
//                 { path: "Area/:areaId", element=<Area />  },
//                 { path: "Bookings", element=<Bookings />  },
//                 { path: "OrderHistory", element=<OrderHistory />  },
// ],  },]);
// function App() {  return (    <RouterProvider router={router} />  );}
// export default App;