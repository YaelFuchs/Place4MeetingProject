import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from '../slice/userSlice';
import placeDetailsReducer from '../slice/placeSlice';
import bookingDetailsReducer from '../slice/bookingSlice'
import categoryDetailsReducer from '../slice/categorySlice';
import favoriteDetailsReducer from '../slice/favoritePlaceSlice'
import messageReducer from '../slice/messagesSlice';
import openingHourReducer from '../slice/openingHoursSlice'
import orderHistoryReducer from '../slice/orderHistorySlice';
import reviewsReducer from '../slice/reviewsSlice';
import areaReducer from '../slice/areaSlice';
export const store = configureStore({
  reducer: {
    userDetails:userDetailsReducer ,//השם שנתנו  userSliceב
    placeDetails:placeDetailsReducer,
    bookingDetails:bookingDetailsReducer,
    categoryDetails:categoryDetailsReducer,
    favoritePlaceDetails: favoriteDetailsReducer,
    messageDetails:messageReducer,
    openingHourDetails:openingHourReducer,
    orderHistoryDetails:orderHistoryReducer,
    reviewsDetails:reviewsReducer,
    areaDetails:areaReducer
  },
});