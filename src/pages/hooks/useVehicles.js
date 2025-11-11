import { useState, useCallback } from 'react';
import { 
  getAllVehicles as getAllVehiclesService, 
  getVehicleById as getVehicleByIdService,
  getMyVehicles as getMyVehiclesService, 
  createVehicle as createVehicleService, 
  updateVehicle as updateVehicleService, 
  deleteVehicle as deleteVehicleService 
} from '../services/vehicleService';

export const useVehicles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get single vehicle by ID
  const getVehicleById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const vehicle = await getVehicleByIdService(id);
      return vehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all vehicles with optional filters
  const getAllVehicles = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const vehicles = await getAllVehiclesService(filters);
      return vehicles;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get vehicles for the current user
  const getMyVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const vehicles = await getMyVehiclesService();
      return vehicles;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new vehicle
  const createVehicle = useCallback(async (vehicleData) => {
    setLoading(true);
    setError(null);
    try {
      const newVehicle = await createVehicleService(vehicleData);
      return newVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing vehicle
  const updateVehicle = useCallback(async (id, vehicleData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedVehicle = await updateVehicleService(id, vehicleData);
      return updatedVehicle;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a vehicle
  const deleteVehicle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteVehicleService(id);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    getVehicleById,
    getAllVehicles,
    getMyVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    clearError
  };
};