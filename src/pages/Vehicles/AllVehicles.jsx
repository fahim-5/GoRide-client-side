import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '../../components/common/VehicleCard';
import SearchFilter from '../../components/ui/SearchFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useVehicles } from '../hooks/useVehicles'; 
import { useBookings } from '../hooks/useBookings';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'; // 🟢 Import Theme Context
import { toast } from 'react-hot-toast'; 

const AllVehicles = () => {
  const navigate = useNavigate();
  const { getAllVehicles, loading } = useVehicles();
  const { createBooking } = useBookings();
  const { user } = useAuth();
  // 🟢 Access the theme state
  const { isDark } = useTheme(); 
  
  const [vehicles, setVehicles] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(null);
  const [currentQuery, setCurrentQuery] = useState({});
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // --- Dynamic Class Variables based on isDark ---
  const bgClass = isDark
    ? 'min-h-screen bg-gradient-to-br from-gray-900 to-gray-800'
    : 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50';
    
  const cardClass = isDark
    ? 'bg-gray-800 border-gray-700 shadow-2xl'
    : 'bg-white border-gray-100 shadow-lg';

  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  // ------------------------------------------------

  const fetchVehicles = useCallback(async (filters) => {
    try {
      const allVehicles = await getAllVehicles(filters);
      setVehicles(allVehicles);
    } catch (error) {
      toast.error(error.message || "Failed to load vehicles.");
      setVehicles([]); 
    }
  }, [getAllVehicles]); 

  useEffect(() => {
    fetchVehicles(currentQuery);
    
    // Check if there are active filters
    const hasFilters = Object.keys(currentQuery).length > 0 && 
      Object.values(currentQuery).some(value => 
        value !== undefined && value !== '' && value !== 'newest'
      );
    setHasActiveFilters(hasFilters);
  }, [fetchVehicles, currentQuery]);

  const handleFilter = (filters) => {
    const query = {
      category: filters.category,
      location: filters.location,
      availability: 'Available', 
      sort: currentQuery.sort || 'newest', 
    };

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      query.minPrice = min;
      query.maxPrice = max;
    }

    setCurrentQuery(prev => ({ ...prev, ...query }));
  };

  const handleSort = (sortOption) => {
    setCurrentQuery(prev => ({ ...prev, sort: sortOption }));
  };

  const handleClearFilters = () => {
    console.log('🔄 Clearing all filters');
    setCurrentQuery({});
    fetchVehicles({});
  };

  const handleBookVehicle = async (vehicleId) => {
    if (!user) {
      toast.error('Please login to book a vehicle');
      return;
    }

    try {
      setBookingLoading(vehicleId);
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);

      const bookingData = {
        vehicleId: vehicleId,
        userEmail: user.email,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        notes: 'Booking from All Vehicles page'
      };

      console.log('Attempting to book with data:', bookingData);
      await createBooking(bookingData);
      toast.success('Vehicle booked successfully!');
      
      fetchVehicles(currentQuery);
    } catch (error) {
      console.error('Booking error details:', error);
      toast.error(error.message || 'Failed to book vehicle');
    } finally {
      setBookingLoading(null);
    }
  };

  const handleViewDetails = (vehicleId) => {
    console.log('View Details clicked for vehicle ID:', vehicleId);
    console.log('Navigating to:', `/vehicle/${vehicleId}`);
    navigate(`/vehicle/${vehicleId}`);
  };

  // Stats calculation
  const availableVehicles = vehicles.filter(v => v.availability === 'Available').length;
  const totalVehicles = vehicles.length;

  if (loading) {
    return (
      // 🟢 Apply dark mode background
      <div className={`${bgClass} flex items-center justify-center transition-colors duration-300`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    // 🟢 Apply dark mode background
    <div className={`${bgClass} py-8 transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className={`font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full transition-colors duration-300 ${
                isDark ? 'text-blue-400 bg-blue-900/50' : 'text-blue-600 bg-blue-50'
              }`}>
                Premium Fleet
              </span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${textPrimary}`}>
              Explore Our Vehicles
            </h1>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${textSecondary}`}>
              Discover the perfect vehicle for your journey from our curated collection of premium rides.
            </p>
          </div>

          {/* Stats Bar */}
          <div className={`rounded-2xl p-6 mb-8 border transition-colors duration-300 ${cardClass}`}>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center space-x-8 mb-4 lg:mb-0">
                <div className="text-center">
                  <div className={`text-2xl font-bold text-blue-600 transition-colors duration-300 ${isDark ? 'dark:text-blue-400' : ''}`}>{totalVehicles}</div>
                  <div className={`text-sm transition-colors duration-300 ${textSecondary}`}>Total Vehicles</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-green-600 transition-colors duration-300 ${isDark ? 'dark:text-green-400' : ''}`}>{availableVehicles}</div>
                  <div className={`text-sm transition-colors duration-300 ${textSecondary}`}>Available Now</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-orange-600 transition-colors duration-300 ${isDark ? 'dark:text-orange-400' : ''}`}>
                    {totalVehicles - availableVehicles}
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${textSecondary}`}>Currently Booked</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-lg text-sm transition-colors duration-300 ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'
                }`}>
                  Showing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
                </div>
                
                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                      isDark 
                        ? 'bg-red-900/50 text-red-400 hover:bg-red-900/70' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className={`rounded-2xl p-6 mb-8 border transition-colors duration-300 ${cardClass}`}>
            <SearchFilter 
              onFilter={handleFilter} 
              onSort={handleSort} 
              onClearFilters={handleClearFilters}
              // You might need to pass isDark to SearchFilter if it contains internal dark-sensitive styles
              isDark={isDark} 
            />
          </div>

          {/* Vehicles Grid */}
          {vehicles.length === 0 ? (
            <div className={`rounded-2xl p-12 text-center border transition-colors duration-300 ${cardClass}`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <svg className={`w-12 h-12 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${textPrimary}`}>No Vehicles Found</h3>
              <p className={`mb-8 max-w-md mx-auto transition-colors duration-300 ${textSecondary}`}>
                {hasActiveFilters 
                  ? "We couldn't find any vehicles matching your criteria. Try adjusting your filters or clearing them to see all vehicles."
                  : "There are no vehicles available at the moment. Please check back later."
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {vehicles.map(vehicle => (
                  <div 
                    key={vehicle._id} 
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-2 group ${cardClass}`}
                  >
                    {/* Vehicle Card Content */}
                    <div className="relative">
                      {/* NOTE: VehicleCard needs to be dark mode aware internally */}
                      <VehicleCard vehicle={vehicle} />
                      
                      {/* Action Buttons */}
                      <div className={`p-6 pt-4 border-t transition-colors duration-300 ${
                        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'
                      }`}>
                        {/* Button Group */}
                        <div className="flex flex-col space-y-3">
                          {/* View Details Button */}
                          <button
                            onClick={() => handleViewDetails(vehicle._id)}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>View Details</span>
                          </button>

                          {/* Book Button */}
                          {vehicle.availability === 'Available' ? (
                            <button
                              onClick={() => handleBookVehicle(vehicle._id)}
                              disabled={bookingLoading === vehicle._id}
                              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900"
                            >
                              {bookingLoading === vehicle._id ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Booking...</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>Book Now</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <div className={`w-full py-3 rounded-xl font-semibold text-center transition-colors duration-300 ${
                              isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-500'
                            }`}>
                              <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Currently Booked</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Quick Info */}
                        <div className={`flex justify-between items-center mt-3 text-sm transition-colors duration-300 ${textSecondary}`}>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>${vehicle.pricePerDay}/day</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>{vehicle.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVehicles;