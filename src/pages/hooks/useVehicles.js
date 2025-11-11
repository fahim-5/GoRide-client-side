import { useState } from 'react';
import { 
  // Rename all imported service functions to avoid recursion bugs
  getAllVehicles as getAllVehiclesService,
  getVehicle as getVehicleService,
  getMyVehicles as getMyVehiclesService,
  getLatestVehicles as getLatestVehiclesService,
  createVehicle as createVehicleService, 
  updateVehicle as updateVehicleService, 
  deleteVehicle as deleteVehicleService
} from '../services/vehicleService';

export const useVehicles = () => {
  const [loading, setLoading] = useState(false);

  const getAllVehicles = async () => {
    setLoading(true);
    try {
      // Calls the renamed service function
      const response = await getAllVehiclesService();
      return response.data;
    } catch (error) {
      // Improved error handling
      throw new Error(error.response?.data?.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const getVehicle = async (id) => {
    setLoading(true);
    try {
      const response = await getVehicleService(id);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch vehicle');
    } finally {
      setLoading(false);
    }
  };

  const getMyVehicles = async (userEmail) => {
    setLoading(true);
    try {
      const response = await getMyVehiclesService(userEmail);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch your vehicles');
    } finally {
      setLoading(false);
    }
  };

  // FIX APPLIED HERE: Calls the correctly renamed service function
  const getLatestVehicles = async () => {
    setLoading(true);
    try {
      const response = await getLatestVehiclesService(); 
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch latest vehicles');
    } finally {
      setLoading(false);
    }
  };

  const addVehicle = async (vehicleData) => {
    setLoading(true);
    try {
      const response = await createVehicleService(vehicleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    setLoading(true);
    try {
      const response = await updateVehicleService(id, vehicleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setLoading(true);
    try {
      const response = await deleteVehicleService(id);
      return response.data;
    } catch (error) {
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