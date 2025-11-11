import API from './api';

export const getAllVehicles = async (filters = {}) => {
  const response = await API.get('/vehicles', { params: filters });
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await API.get(`/vehicles/${id}`);
  return response.data;
};

// Keep for backward compatibility
export const getVehicle = async (id) => {
  const response = await API.get(`/vehicles/${id}`);
  return response.data;
};

export const getMyVehicles = async () => {
  const response = await API.get('/vehicles/my-vehicles');
  return response.data;
};

export const getMyVehiclesByEmail = async (userEmail) => {
  const response = await API.get(`/vehicles/user/${userEmail}`);
  return response.data;
};

export const getLatestVehicles = async () => {
  const response = await API.get('/vehicles/latest');
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await API.post('/vehicles', vehicleData);
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await API.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await API.delete(`/vehicles/${id}`);
  return response.data;
};