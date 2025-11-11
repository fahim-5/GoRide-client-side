import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useVehicles } from '../hooks/useVehicles';
import VehicleCard from '../../components/common/VehicleCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';

const MyVehicles = () => {
  const { user } = useAuth();
  const { getMyVehicles, deleteVehicle, loading } = useVehicles();
  const [vehicles, setVehicles] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (user) {
        try {
          setFetchLoading(true);
          console.log('Fetching vehicles for user:', user.email);
          
          let myVehicles;
          try {
            // Try the new endpoint first
            myVehicles = await getMyVehicles();
          } catch (error) {
            console.log('New endpoint failed, trying legacy endpoint:', error);
            // Fall back to legacy endpoint if new one fails
            myVehicles = await getMyVehicles(user.email);
          }
          
          console.log('Fetched vehicles:', myVehicles);
          setVehicles(Array.isArray(myVehicles) ? myVehicles : []);
        } catch (error) {
          console.error('Failed to fetch vehicles:', error);
          toast.error(error.message || 'Failed to load your vehicles. Please try again.');
        } finally {
          setFetchLoading(false);
        }
      }
    };
    
    fetchVehicles();
  }, [user, getMyVehicles]);

  const handleDelete = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(vehicleId);
      await deleteVehicle(vehicleId);
      
      // Remove the vehicle from local state
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== vehicleId));
      toast.success('Vehicle deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete vehicle. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
          <p className="text-gray-600 mb-6">Please login to view your vehicles.</p>
          <Link 
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
        

          {/* Stats and Action Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{vehicles.length}</div>
                  <div className="text-sm text-gray-500">Total Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {vehicles.filter(v => v.availability === 'Available').length}
                  </div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {vehicles.filter(v => v.availability === 'Booked').length}
                  </div>
                  <div className="text-sm text-gray-500">Booked</div>
                </div>
              </div>
              
              <Link 
                to="/add-vehicle"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New Vehicle</span>
              </Link>
            </div>
          </div>

          {/* Vehicles Grid */}
          {vehicles.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Vehicles Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start your journey by adding your first vehicle and begin earning from rentals.
              </p>
              <Link 
                to="/add-vehicle"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add Your First Vehicle
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Vehicle Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={vehicle.coverImage} 
                      alt={vehicle.vehicleName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vehicle.availability === 'Available' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {vehicle.availability}
                      </span>
                    </div>

                    {/* Always Visible Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {/* Edit Button */}
                      <Link 
                        to={`/update-vehicle/${vehicle._id}`}
                        className="bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                        title="Edit Vehicle"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(vehicle._id)}
                        disabled={deletingId === vehicle._id || loading}
                        className="bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        title="Delete Vehicle"
                      >
                        {deletingId === vehicle._id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                      <span className="font-bold text-lg">${vehicle.pricePerDay}</span>
                      <span className="text-sm opacity-90">/day</span>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 truncate mr-2">
                        {vehicle.vehicleName}
                      </h3>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm font-medium whitespace-nowrap">
                        {vehicle.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {vehicle.description}
                    </p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{vehicle.location}</span>
                    </div>

                    {/* Additional Info */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{vehicle.categories || 'Standard'}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Added {new Date(vehicle.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;