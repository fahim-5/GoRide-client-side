import { useState } from 'react';
import { 
  createBooking as createBookingService, // Renamed
  getBookingsByUser as getBookingsByUserService // Renamed
} from '../services/bookingService'; // Ensure this path is correct

export const useBookings = () => {
  const [loading, setLoading] = useState(false);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      // Calls the renamed service function
      const response = await createBookingService(bookingData); 
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const getMyBookings = async (userEmail) => {
    setLoading(true);
    try {
      // Calls the renamed service function
      const response = await getBookingsByUserService(userEmail); 
      return response.data;
    } catch (error) {
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