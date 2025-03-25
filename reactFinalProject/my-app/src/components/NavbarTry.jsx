// יבוא של כל הרכיבים הדרושים מהספריות השונות
import * as React from 'react';
import {useEffect}  from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from "react-redux";
// import { getallbooksbysearch } from '../slices/bookSlice';
import { Link, useNavigate } from 'react-router-dom';
// import Logo from '/images/logo.png';
import {GetAllCategory } from '../slice/categorySlice';
import {GetAllArea} from '../slice/areaSlice';


// עיצוב האלמנט הראשי של שדה החיפוש
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.black, 0.25) },
  marginLeft: theme.spacing(3),
  width: '30%',
  border: '1px solid #008fff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  marginRight: '2vw',
}));

// עיצוב שדה הקלט של שדה החיפוש
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  color: 'white',
  paddingLeft: theme.spacing(2),
}));

// עיצוב כפתור הניקוי (Clear)
const ClearButton = styled(IconButton)(({ theme }) => ({
  color: '#008fff',
  marginRight: theme.spacing(1),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#008fff',
}));

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hamburgerAnchorEl, setHamburgerAnchorEl] = React.useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);
  const [areaAnchorEl, setAreaAnchorEl] = React.useState(null);
  const [isAreaMenuOpen, setIsAreaMenuOpen] = React.useState(false);
  

  const user = useSelector((state) => state.userDetails.user);
  const categories = useSelector((state) => state.categoryDetails.categories);
  useEffect(() => {
    const fetchData = async () => {
        try {
            await dispatch(GetAllCategory());
        } catch (error) {
         alert("שגיאה זמנית ")
        }
    };
    fetchData();
}, []);
const areas = useSelector((state) => state.areaDetails.areas);
useEffect(() => {
  const fetchData = async () => {
      try {
          await dispatch(GetAllArea());
      } catch (error) {
       alert("שגיאה זמנית ")
      }
  };
  fetchData();
}, []);

  
 

  console.log("userrrrrrrrrrrrrr", user);
  const [countMessage, setCountMessage] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:768px)'); // גודל מסך

 
  const [searchValue, setSearchValue] = React.useState('');

  const isHamburgerMenuOpen = Boolean(hamburgerAnchorEl);
  const isUserMenuOpen = Boolean(anchorEl);
  const isMoreMenuOpen = Boolean(moreAnchorEl);
  // const isCategoryMenuOpen = Boolean(categoryAnchorEl);

  const handleHamburgerMenuOpen = (event) => setHamburgerAnchorEl(event.currentTarget);
  const handleHamburgerMenuClose = () => setHamburgerAnchorEl(null);

  const handleUserMenuOpen = (event) => setMoreAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setMoreAnchorEl(null);
  const handleMoreMenuClose =() => setAnchorEl(null);

  const handleCategoryMenuOpen = (event) => {
    setCategoryAnchorEl(event.currentTarget);
    setIsCategoryMenuOpen(true);
  }; 
  const handleCategoryMenuClose = () =>  setCategoryAnchorEl(null);
  
  const handleCategoryClick = (categoryId) => {
    handleCategoryMenuClose
    // Handle category click, e.g., navigate to a specific route
    navigate(`/Category/${categoryId}`);
  };

  const handleAreaMenuOpen = (event) => {
    setAreaAnchorEl(event.currentTarget);
    setIsAreaMenuOpen(true);
  }; 
  const handleAreaMenuClose = () =>  setAreaAnchorEl(null);
  
  const handleAreaClick = (areaId) => {
    handleAreaMenuClose
    // Handle category click, e.g., navigate to a specific route
    navigate(`/Area/${areaId}`);
  };
  const search = () => {
    if (searchValue !== '') {
      dispatch(getallbooksbysearch(searchValue));
      navigate("/Search");
    }
  };

  const renderUserMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isUserMenuOpen}
      onClose={handleUserMenuClose}
    >
      <div>
      {user ? (
        <>
        
          <MenuItem disabled>
          
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", backgroundColor: "#1e88e5", width: "100%", textAlign: "center" }}>
              {user.name} 
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <EditIcon sx={{ marginRight: 1 }} />
            <Link to='/UpdateUser' style={{ textDecoration: 'none', color: 'black' }}>עדכון פרטים</Link>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <FavoriteIcon sx={{ marginRight: 1 }} />
            המועדפים שלי
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            התנתקות
          </MenuItem>
          

        </>
      ) : (
        <>
        
          <MenuItem onClick={handleUserMenuClose}>
            <Link to='/Login' style={{ textDecoration: 'none', color: 'black' }}>התחברות</Link>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <Link to='/Signup' style={{ textDecoration: 'none', color: 'black' }}>הרשמה</Link>
          </MenuItem>
        </>
      )}
      </div>
    </Menu>

  );

  // const renderHamburgerMenu = (
  //   <Menu
  //     anchorEl={hamburgerAnchorEl}
  //     keepMounted
  //     open={isHamburgerMenuOpen}
  //     onClose={handleHamburgerMenuClose}
  //   >
     
   


{/* 
          <MenuItem onClick={handleHamburgerMenuClose}>
            <a href="/Profil" style={{ textDecoration: 'none', color: 'black' }}>פרופיל</a>
          </MenuItem>
          <MenuItem onClick={handleHamburgerMenuClose}>
            <a href="/PresentBook" style={{ textDecoration: 'none', color: 'black' }}>הספרים שלי</a>
          </MenuItem> */}

     
  //   </Menu>
  // );

//   const renderMoreMenu = (
//     <Menu
//       anchorEl={moreAnchorEl}
//       keepMounted
//       open={isMoreMenuOpen}
//       onClose={handleMoreMenuClose}
//     >
//       <MenuItem onClick={handleMoreMenuClose}>
//         <IconButton size="large" color="inherit">
//           <Badge badgeContent={countMessage} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         הודעות
//       </MenuItem>
//       <MenuItem onClick={handleMoreMenuClose}>
//         <IconButton size="large" color="inherit">
//           <FavoriteIcon />
//         </IconButton>
//         מועדפים
//       </MenuItem>
// </Menu>
//   );
//   const renderCategoryMenuOpen=(
//     <Menu
//     anchorEl={categoryAnchorEl}
//     keepMounted
//     open={isCategoryMenuOpen}
//     onClose={handleCategoryClick}
//   >
//      <MenuItem onClick={handleMoreMenuClose}>
//         <IconButton size="large" color="inherit">
//           <Badge badgeContent={countMessage} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         הודעות
//       </MenuItem>
//       <MenuItem onClick={handleMoreMenuClose}>
//         <IconButton size="large" color="inherit">
//           <FavoriteIcon />
//         </IconButton>
//         מועדפים
//       </MenuItem>
// </Menu>
  // )

  return (
    <Box sx={{ flexGrow: 1, direction: 'rtl', alignItems: "center" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'black',
        }}
      >
        <Toolbar>

          <IconButton size="large" color="inherit" onClick={handleUserMenuOpen}>
            <Badge badgeContent={countMessage} color="error">
              <AccountCircle />
            </Badge>
          </IconButton>
          {renderUserMenu} 
          <Search>
            <SearchIconWrapper onClick={search}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="חיפוש לפי מקום"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <ClearButton onClick={() => setSearchValue('')}>
                <CloseIcon />
              </ClearButton>
            )}
          </Search>
          <div>
           
          <Button
          id="basic-button"
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleCategoryMenuOpen}
          >
          קטגוריות
        </Button>
        {isCategoryMenuOpen && (
          <Menu
            id="simple-menu"
            anchorEl={categoryAnchorEl}
            open={isCategoryMenuOpen}
            // Remove onClick prop
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} onClick={()=>handleCategoryClick(category.id)}  style={{ textDecoration: 'none', color: 'black' }} >
                {category.categoryName} 
              </MenuItem>
            ))}
          </Menu>
        )}
              
            </div>
         <div>
          <Button
          id="basic-button"
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleAreaMenuOpen}
          >
          איזור
        </Button>
        {isAreaMenuOpen && (
          <Menu
            id="simple-menu"
            anchorEl={areaAnchorEl}
            open={isAreaMenuOpen}
            // Remove onClick prop
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {areas.map((area) => (
              <MenuItem key={area.id} onClick={()=>handleAreaClick(area.id)}  style={{ textDecoration: 'none', color: 'black' }} >
                {area.areaName} 
              </MenuItem>
            ))}
          </Menu>
        )}
              
         </div>
          {/* <Box sx={{ flexGrow: 1 }} />
          {!isMobile && (
            <>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={countMessage} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <FavoriteIcon />
              </IconButton>
            </>
          )}
          {isMobile && (
            <IconButton
              size="large"
              color="inherit"
              aria-label="more"
              onClick={handleUserMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          )}
          {renderMoreMenu}
          <IconButton size="large" color="inherit" onClick={handleUserMenuOpen}>
            <Badge badgeContent={countMessage} color="error">
              <AccountCircle />
            </Badge>
          </IconButton>
          {renderUserMenu} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}