import { useState } from 'react';
import { createBooking, getBookingsByUser } from '../services/bookingService';

export const useBookings = () => {
  const [loading, setLoading] = useState(false);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const response = await createBooking(bookingData);
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
      const response = await getBookingsByUser(userEmail);
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