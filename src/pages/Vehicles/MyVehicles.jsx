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
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please login to view your vehicles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Vehicles</h1>
              <p className="text-gray-600 mt-2">Manage your listed vehicles</p>
              <p className="text-sm text-gray-500 mt-1">
                {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <Link 
              to="/add-vehicle"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add New Vehicle
            </Link>
          </div>

          {vehicles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">You haven't added any vehicles yet.</p>
              <p className="text-gray-500 mt-2">Start by adding your first vehicle to rent.</p>
              <Link 
                to="/add-vehicle"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                Add Your First Vehicle
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="relative group">
                  <VehicleCard vehicle={vehicle} />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* Edit Button */}
                    <Link 
                      to={`/update-vehicle/${vehicle._id}`}
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors shadow-lg"
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
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete Vehicle"
                    >
                      {deletingId === vehicle._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Quick Info Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">${vehicle.pricePerDay}/day</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        vehicle.availability === 'Available' 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}>
                        {vehicle.availability}
                      </span>
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