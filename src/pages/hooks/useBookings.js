import { useState } from 'react';
import { 
  // FIX: Renamed the imported function to avoid recursion
  createBooking as createBookingService, 
  getBookingsByUser 
} from '../services/bookingService'; 

export const useBookings = () => {
  const [loading, setLoading] = useState(false);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      // ✅ Calls the renamed service function
      const response = await createBookingService(bookingData); 
      return response.data;
    } catch (error) {
      console.error("Failed to create booking:", error);
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const getMyBookings = async (userEmail) => {
    setLoading(true);
    try {
      const response = await getBookingsByUser(userEmail);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    getMyBookings,
    loading
  };
};