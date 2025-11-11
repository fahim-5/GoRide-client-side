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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-6">Please login to update vehicles.</p>
          <Link 
            to="/login" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!vehicle && !fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Vehicle Not Found</h3>
          <p className="text-gray-600 mb-6">The vehicle you're trying to update doesn't exist or has been removed.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/my-vehicles" 
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-center"
            >
              Back to My Vehicles
            </Link>
            <Link 
              to="/vehicles" 
              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-center"
            >
              Browse All Vehicles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">Editing: {vehicle?.vehicleName}</h2>
                    <p className="text-blue-100 text-sm">Make your changes below</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium border border-white/30 backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                  <Link 
                    to="/my-vehicles"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>My Vehicles</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {updateError && (
              <div className="mx-6 mt-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Update Error</h4>
                      <p className="text-red-700 text-sm">{updateError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vehicle Form */}
            <div className="p-6">
              <VehicleForm 
                vehicle={vehicle}
                onSubmit={handleSubmit}
                loading={loading}
                isUpdate={true}
              />
            </div>

            {/* Quick Stats Footer */}
            {vehicle && (
              <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Category</div>
                    <div className="font-semibold text-gray-800">{vehicle.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Price/Day</div>
                    <div className="font-semibold text-green-600">${vehicle.pricePerDay}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Status</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      vehicle.availability === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.availability}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <div className="font-semibold text-gray-800 truncate">{vehicle.location}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Update Tips</h3>
              <p className="text-gray-600 text-sm">
                Keep your vehicle details accurate and up-to-date to attract more renters and avoid booking issues.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Best Practices</h3>
              <p className="text-gray-600 text-sm">
                Use clear, high-quality images and provide detailed descriptions to increase your booking chances.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Manage Listings</h3>
              <p className="text-gray-600 text-sm">
                Visit your vehicles dashboard to manage all your listings, view bookings, and track earnings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicle;