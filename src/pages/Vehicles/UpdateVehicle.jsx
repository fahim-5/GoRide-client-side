import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleForm from '../../components/forms/VehicleForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useVehicles } from '../hooks/useVehicles';


const UpdateVehicle = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getVehicle, updateVehicle, loading } = useVehicles();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleData = await getVehicle(id);
        if (vehicleData.userEmail !== user.email) {
          toast.error('You can only update your own vehicles.');
          navigate('/my-vehicles');
          return;
        }
        setVehicle(vehicleData);
      } catch (error) {
        toast.error('Vehicle not found.');
        navigate('/my-vehicles');
      }
    };

    if (user && id) {
      fetchVehicle();
    }
  }, [id, user, getVehicle, navigate]);

  const handleSubmit = async (vehicleData) => {
    try {
      await updateVehicle(id, vehicleData);
      toast.success('Vehicle updated successfully!');
      navigate('/my-vehicles');
    } catch (error) {
      toast.error('Failed to update vehicle. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please login to update vehicles.</p>
        </div>
      </div>
    );
  }

  if (loading || !vehicle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <VehicleForm 
          vehicle={vehicle}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UpdateVehicle;