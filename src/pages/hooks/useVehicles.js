import { useState } from 'react';
import { 
  getAllVehicles, 
  getVehicle, 
  getMyVehicles, 
  getLatestVehicles,
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from '../services/vehicleService';

export const useVehicles = () => {
  const [loading, setLoading] = useState(false);

  const getAllVehicles = async () => {
    setLoading(true);
    try {
      const response = await getAllVehicles();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const getVehicle = async (id) => {
    setLoading(true);
    try {
      const response = await getVehicle(id);
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
      const response = await getMyVehicles(userEmail);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch your vehicles');
    } finally {
      setLoading(false);
    }
  };

  const getLatestVehicles = async () => {
    setLoading(true);
    try {
      const response = await getLatestVehicles();
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
      const response = await createVehicle(vehicleData);
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
      const response = await updateVehicle(id, vehicleData);
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
      const response = await deleteVehicle(id);
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