import { useState, useCallback } from 'react';
import { 
  getAllVehicles as apiGetAllVehicles, 
  getVehicle as apiGetVehicle, 
  getMyVehicles as apiGetMyVehicles, 
  getMyVehiclesByEmail as apiGetMyVehiclesByEmail,
  getLatestVehicles as apiGetLatestVehicles,
  createVehicle as apiCreateVehicle, 
  updateVehicle as apiUpdateVehicle, 
  deleteVehicle as apiDeleteVehicle 
} from '../services/vehicleService'; 

export const useVehicles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({
    add: false,
    update: false,
    delete: false,
    fetch: false
  });

  // Helper function to handle API errors
  const handleApiError = (error, defaultMessage) => {
    console.error(defaultMessage + ":", error);
    
    let errorMessage = defaultMessage;
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.status === 401) {
      errorMessage = 'Authentication failed. Please login again.';
    } else if (error.response?.status === 403) {
      errorMessage = 'You are not authorized to perform this action.';
    } else if (error.response?.status === 404) {
      errorMessage = 'Vehicle not found.';
    } else if (error.response?.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    
    setError(errorMessage);
    throw new Error(errorMessage);
  };

  // Set specific action loading state
  const setActionState = (action, isLoading) => {
    setActionLoading(prev => ({
      ...prev,
      [action]: isLoading
    }));
  };

  const getAllVehicles = useCallback(async (filters = {}) => {
    setLoading(true);
    setActionState('fetch', true);
    setError(null);
    
    try {
      const response = await apiGetAllVehicles(filters);
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
      setActionState('fetch', false);
    }
  }, []);

  const getVehicle = useCallback(async (id) => {
    if (!id) {
      const error = new Error('Vehicle ID is required');
      setError(error.message);
      throw error;
    }

    setLoading(true);
    setActionState('fetch', true);
    setError(null);
    
    try {
      const response = await apiGetVehicle(id);
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch vehicle');
    } finally {
      setLoading(false);
      setActionState('fetch', false);
    }
  }, []);

  const getMyVehicles = useCallback(async (useLegacy = false, userEmail = '') => {
    setLoading(true);
    setActionState('fetch', true);
    setError(null);
    
    try {
      let response;
      
      if (useLegacy && userEmail) {
        // Use legacy endpoint with email
        response = await apiGetMyVehiclesByEmail(userEmail);
      } else {
        // Use new authenticated endpoint
        response = await apiGetMyVehicles();
      }
      
      // Handle different response structures
      return response.data?.data || response.data || [];
    } catch (error) {
      return handleApiError(error, 'Failed to fetch your vehicles');
    } finally {
      setLoading(false);
      setActionState('fetch', false);
    }
  }, []);

  const getLatestVehicles = useCallback(async () => {
    setLoading(true);
    setActionState('fetch', true);
    setError(null);
    
    try {
      const response = await apiGetLatestVehicles();
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch latest vehicles');
    } finally {
      setLoading(false);
      setActionState('fetch', false);
    }
  }, []);

  const addVehicle = useCallback(async (vehicleData) => {
    if (!vehicleData || typeof vehicleData !== 'object') {
      const error = new Error('Invalid vehicle data');
      setError(error.message);
      throw error;
    }

    setLoading(true);
    setActionState('add', true);
    setError(null);
    
    try {
      const response = await apiCreateVehicle(vehicleData);
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Failed to add vehicle');
    } finally {
      setLoading(false);
      setActionState('add', false);
    }
  }, []);

  const updateVehicle = useCallback(async (id, vehicleData) => {
    if (!id) {
      const error = new Error('Vehicle ID is required for update');
      setError(error.message);
      throw error;
    }

    if (!vehicleData || typeof vehicleData !== 'object') {
      const error = new Error('Invalid vehicle data');
      setError(error.message);
      throw error;
    }

    setLoading(true);
    setActionState('update', true);
    setError(null);
    
    try {
      const response = await apiUpdateVehicle(id, vehicleData);
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Failed to update vehicle');
    } finally {
      setLoading(false);
      setActionState('update', false);
    }
  }, []);

  const deleteVehicle = useCallback(async (id) => {
    if (!id) {
      const error = new Error('Vehicle ID is required for deletion');
      setError(error.message);
      throw error;
    }

    setLoading(true);
    setActionState('delete', true);
    setError(null);
    
    try {
      const response = await apiDeleteVehicle(id);
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Failed to delete vehicle');
    } finally {
      setLoading(false);
      setActionState('delete', false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset all states
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setActionLoading({
      add: false,
      update: false,
      delete: false,
      fetch: false
    });
  }, []);

  return {
    // CRUD Operations
    getAllVehicles,
    getVehicle,
    getMyVehicles,
    getLatestVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    
    // State
    loading,
    error,
    actionLoading, // Specific loading states for different actions
    
    // Utility Functions
    clearError,
    reset
  };
};