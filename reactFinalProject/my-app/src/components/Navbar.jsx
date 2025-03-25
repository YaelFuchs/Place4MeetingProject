// יבוא של כל הרכיבים הדרושים מהספריות השונות
import * as React from 'react';
import {useEffect , useState}  from 'react';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {GetAllCategory } from '../slice/categorySlice';
import {GetAllArea} from '../slice/areaSlice';
// import  {GetAllBySearch} from '../slice/placeSlice'


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
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);
  const [areaAnchorEl, setAreaAnchorEl] = React.useState(null);
  const [isAreaMenuOpen, setIsAreaMenuOpen] = React.useState(false);
  const [isManager, setIsManager] = useState(false);
  const [countMessage, setCountMessage] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:768px)'); // גודל מסך
   const [search, setSearch] = useState('');
  const isMoreMenuOpen = Boolean(moreAnchorEl);
  const [isManagementMenuOpen, setIsManagementMenuOpen] = useState(false);
  const user = useSelector((state) => state.userDetails.user);
  const categories = useSelector((state) => state.categoryDetails.categories);
  const areas = useSelector((state) => state.areaDetails.areas);

  useEffect(() => {
    const storedManagerValue = localStorage.getItem("manager");
    setIsManager(storedManagerValue === "true");
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    const fetchData = async () => {
        try {
            await dispatch(GetAllCategory());
        } catch (error) {
         alert("שגיאה זמנית ")
        }
    };
    fetchData();
}, [dispatch]);

useEffect(() => {
  const fetchData = async () => {
      try {
          await dispatch(GetAllArea());
      } catch (error) {
       alert("שגיאה זמנית ")
      }
  };
  fetchData();
}, [dispatch]);


  const handleUserMenuOpen = (event) => setMoreAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setMoreAnchorEl(null);
  const handleMoreMenuClose =() => setMoreAnchorEl(null);

  const handleManagementMenuOpen = () => {
    setIsManagementMenuOpen(true);
  };
  
  const handleManagementMenuClose = () => {
    setIsManagementMenuOpen(false);
  };

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
  const handleSearch = () => {
    console.log(search); 
    if (search !== '') {
      console.log(`/Search/${search}`);    
      navigate(`/Search/${search}`);
    }
  };


  const renderMoreMenu = (
    <Menu
      anchorEl={moreAnchorEl}
      keepMounted
      open={isMoreMenuOpen}
      onClose={handleMoreMenuClose}
    >
      <MenuItem disabled>
        <Typography variant="subtitle1" sx={{
          fontWeight: "bold",
          backgroundColor: "#1e88e5",
          width: "100%",
          textAlign: "center"
        }}>
          {user ? (
            user?.userName + " 😊 "
          ) : (
            "שם משתמש"
          )}
        </Typography>
      </MenuItem>
      {user ? (
        <div>
          <MenuItem onClick={handleUserMenuClose}>
            <AccountCircle sx={{ marginRight: 1 }} />
            <Link to='/PersonalArea' style={{ textDecoration: 'none', color: 'black' }}>אזור אישי</Link>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <FavoriteIcon sx={{ marginRight: 1 }} />
            <Link to='/FavoritePlaces' style={{ textDecoration: 'none', color: 'black' }}>מועדפים </Link>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            התנתקות
          </MenuItem>
          {isManager && (
            <>
              <MenuItem onClick={handleManagementMenuOpen}>
                <EditIcon sx={{ marginRight: 1 }} />
                אזור ניהול
              </MenuItem>
              {isManagementMenuOpen && (
               <div>
                  <MenuItem onClick={handleManagementMenuOpen}>
                 <EditIcon sx={{ marginRight: 1 }} />
                 <Link to='/CategoryManagement' style={{ textDecoration: 'none', color: 'black' }}>קטגוריה </Link>
                </MenuItem>
                 <MenuItem onClick={handleManagementMenuOpen}>
                 <EditIcon sx={{ marginRight: 1 }} />
                 <Link to='/AreaManagement' style={{ textDecoration: 'none', color: 'black' }}>אזור </Link>
                </MenuItem>
                 <MenuItem onClick={handleManagementMenuOpen}>
                 <EditIcon sx={{ marginRight: 1 }} />
                 <Link to='/PlacesManagement' style={{ textDecoration: 'none', color: 'black' }}>מקום </Link>
                </MenuItem>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleUserMenuClose}>
            <Link to='/Login' style={{ textDecoration: 'none', color: 'black' }}>התחברות</Link>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose}>
            <Link to='/Signup' style={{ textDecoration: 'none', color: 'black' }}>הרשמה</Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );


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
         <Tooltip title="לדף הבית">
            <IconButton component={Link} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          
          <Search>
            <SearchIconWrapper onClick={handleSearch}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="חיפוש לפי מקום"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <ClearButton onClick={() => setSearch('')}>
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
          style={{ marginRight: 60 }} // Add marginRight here
          
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
              <MenuItem key={category.id} onClick={()=>handleCategoryClick(category.id)}
                style={{ textDecoration: 'none', color: 'black' }} >
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
          style={{ marginRight: 60 }} // Add marginRight here
          >
          אזור
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
              <MenuItem key={area.id} onClick={()=>handleAreaClick(area.id)} 
               style={{ textDecoration: 'none', color: 'black' }} >
                {area.areaName} 
              </MenuItem>
            ))}
          </Menu>
        )}
              
         </div>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
             {!isMobile && (
            <>
              <Tooltip title="למועדפים שלי">
            <IconButton size="large" color="inherit" component={Link} to="/FavoritePlaces">
            <FavoriteIcon />
            </IconButton>
          </Tooltip>           
            </>
          )}
          </>
          ):(<></>)
          
          }
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
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}



