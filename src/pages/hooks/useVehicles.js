import { useState, useCallback } from 'react';
// Renamed imports to prevent naming conflicts with the hook functions
import { 
  getAllVehicles as apiGetAllVehicles, 
  getVehicle as apiGetVehicle, 
  getMyVehicles as apiGetMyVehicles, 
  getLatestVehicles as apiGetLatestVehicles,
  createVehicle as apiCreateVehicle, 
  updateVehicle as apiUpdateVehicle, 
  deleteVehicle as apiDeleteVehicle 
} from '../services/vehicleService'; 

export const useVehicles = () => {
  const [loading, setLoading] = useState(false);

  // Use useCallback for stable function references
  const getAllVehicles = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      // Pass filters to the backend API call
      const response = await apiGetAllVehicles(filters); 
      return response.data;
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      throw new Error(error.response?.data?.message || 'Failed to fetch vehicles'); 
    } finally {
      setLoading(false);
    }
  }, []);

  const getVehicle = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await apiGetVehicle(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch vehicle:", error);
      throw new Error(error.response?.data?.message || 'Failed to fetch vehicle');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyVehicles = useCallback(async (userEmail) => {
    setLoading(true);
    try {
      const response = await apiGetMyVehicles(userEmail);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user vehicles:", error);
      throw new Error(error.response?.data?.message || 'Failed to fetch your vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  const getLatestVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGetLatestVehicles();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch latest vehicles:", error);
      throw new Error(error.response?.data?.message || 'Failed to fetch latest vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  const addVehicle = async (vehicleData) => {
    setLoading(true);
    try {
      const response = await apiCreateVehicle(vehicleData);
      return response.data;
    } catch (error) {
      console.error("Failed to add vehicle:", error);
      throw new Error(error.response?.data?.message || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    setLoading(true);
    try {
      const response = await apiUpdateVehicle(id, vehicleData);
      return response.data;
    } catch (error) {
      console.error("Failed to update vehicle:", error);
      throw new Error(error.response?.data?.message || 'Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setLoading(true);
    try {
      const response = await apiDeleteVehicle(id);
      return response.data;
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      throw new Error(error.response?.data?.message || 'Failed to delete vehicle');
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllVehicles,
    getVehicle,
    getMyVehicles,
    getLatestVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    loading
  };
};