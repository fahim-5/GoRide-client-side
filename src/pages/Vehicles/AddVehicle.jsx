import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useVehicles } from '../hooks/useVehicles';
// import { useBookings } from '../../hooks/useBookings';
import VehicleForm from '../../components/forms/VehicleForm';
import { toast } from 'react-hot-toast';

const AddVehicle = () => {
  const { user } = useAuth();
  const { addVehicle, loading } = useVehicles();
  const navigate = useNavigate();

  const handleSubmit = async (vehicleData) => {
    try {
      await addVehicle(vehicleData);
      toast.success('Vehicle added successfully!');
      navigate('/my-vehicles');
    } catch (error) {
      toast.error('Failed to add vehicle. Please try again.');
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
        <VehicleForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddVehicle;