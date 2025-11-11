import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Corrected to point two levels up to the context directory
import { useAuth } from '../../context/AuthContext'; 
import { useVehicles } from '../hooks/useVehicles';
import VehicleForm from '../../components/forms/VehicleForm';
import { toast } from 'react-hot-toast';

const AddVehicle = () => {
  // Now correctly accesses the User from the AuthProvider wrapping the app
  const { user } = useAuth();
  const { addVehicle, loading } = useVehicles();
  const navigate = useNavigate();

  const handleSubmit = async (vehicleData) => {
    try {
      // NOTE: The userEmail field is correctly set on the backend via authMiddleware
      await addVehicle(vehicleData);
      toast.success('Vehicle added successfully!');
      navigate('/my-vehicles');
    } catch (error) {
      // Improved error message to log the detailed error on the console
      console.error("Add Vehicle Error:", error);
      toast.error('Failed to add vehicle. Please try again.');
    }
  };

  if (!user) {
    // This check is good practice, although PrivateRoute usually handles it
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please login to add a vehicle.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <VehicleForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddVehicle;