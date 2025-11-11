import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { useVehicles } from '../hooks/useVehicles';
import VehicleForm from '../../components/forms/VehicleForm';
import { toast } from 'react-hot-toast';

const AddVehicle = () => {
  const { user } = useAuth();
  const { addVehicle, loading, error, clearError } = useVehicles();
  const navigate = useNavigate();

  // Clear error when component mounts or when error changes
  useState(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  const handleSubmit = async (vehicleData) => {
    try {
      console.log('Adding vehicle with data:', vehicleData);
      await addVehicle(vehicleData);
      toast.success('Vehicle added successfully!');
      navigate('/my-vehicles');
    } catch (error) {
      console.error("Add Vehicle Error:", error);
      toast.error(error.message || 'Failed to add vehicle. Please try again.');
    }
  };

  if (!user) {
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Add New Vehicle
          </h1>
          <VehicleForm 
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;