import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import VehicleForm from '../../components/forms/VehicleForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useVehicles } from '../hooks/useVehicles';

const UpdateVehicle = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getVehicle, updateVehicle, loading } = useVehicles();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!user || !id) return;
      
      try {
        setFetchLoading(true);
        setUpdateError('');
        
        console.log('Fetching vehicle for update:', id);
        const vehicleData = await getVehicle(id);
        
        // Check if vehicle exists
        if (!vehicleData) {
          toast.error('Vehicle not found.');
          navigate('/my-vehicles');
          return;
        }
        
        // Check if user is the owner
        if (vehicleData.userEmail !== user.email) {
          toast.error('You can only update your own vehicles.');
          navigate('/my-vehicles');
          return;
        }
        
        console.log('Vehicle data loaded:', vehicleData);
        setVehicle(vehicleData);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        const errorMessage = error.response?.data?.message || 'Vehicle not found or access denied.';
        setUpdateError(errorMessage);
        toast.error(errorMessage);
        navigate('/my-vehicles');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchVehicle();
  }, [id, user, getVehicle, navigate]);

  const handleSubmit = async (vehicleData) => {
    try {
      setUpdateError('');
      console.log('Updating vehicle with data:', vehicleData);
      
      await updateVehicle(id, vehicleData);
      toast.success('Vehicle updated successfully!');
      navigate('/my-vehicles');
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update vehicle. Please try again.';
      setUpdateError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/my-vehicles');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please login to update vehicles.</p>
          <Link to="/login" className="text-blue-600 hover:underline mt-2 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!vehicle && !fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Vehicle not found.</p>
          <Link to="/my-vehicles" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to My Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Update Vehicle</h1>
              <p className="text-gray-600 mt-2">Edit your vehicle information</p>
            </div>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Error Message */}
        {updateError && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <strong>Error: </strong>{updateError}
            </div>
          </div>
        )}

        {/* Vehicle Form */}
        <VehicleForm 
          vehicle={vehicle}
          onSubmit={handleSubmit}
          loading={loading}
          isUpdate={true}
        />

        {/* Quick Actions */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
            <div className="flex space-x-4">
              <Link 
                to="/my-vehicles"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                ← Back to My Vehicles
              </Link>
              <Link 
                to="/add-vehicle"
                className="text-green-600 hover:text-green-800 hover:underline"
              >
                + Add New Vehicle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicle;