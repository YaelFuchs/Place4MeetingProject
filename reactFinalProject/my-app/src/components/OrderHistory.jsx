
import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllOrderHistory } from '../slice/orderHistorySlice'; // Import the thunk action

export default function OrderHistory(){
    const dispatch = useDispatch();
  const orderHistory = useSelector(state => state.orderHistoryDetails.orderHistory);
  const loading = useSelector(state => state.orderHistoryDetails.loading);
  const error = useSelector(state => state.orderHistoryDetails.error);

  useEffect(() => {
    dispatch(GetAllOrderHistory()); // Dispatch the thunk to fetch all order history
  }, []); // Empty dependency array to fetch data once on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!orderHistory) {
    return <p>No order history found.</p>;
  }

  // Display the order history data here (e.g., using a map function)
  return (
    <ul>
      {orderHistory.map(order => (
        <li key={order.id}>{order.details}</li>
      ))}
    </ul>
  );
};