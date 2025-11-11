import { useState, useEffect, useCallback } from 'react';
import VehicleCard from '../../components/common/VehicleCard';
import SearchFilter from '../../components/ui/SearchFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useVehicles } from '../hooks/useVehicles'; 
import { toast } from 'react-hot-toast'; 

const AllVehicles = () => {
  const { getAllVehicles, loading } = useVehicles();
  const [vehicles, setVehicles] = useState([]);
  // State to hold the current filter/sort query parameters
  const [currentQuery, setCurrentQuery] = useState({});

  const fetchVehicles = useCallback(async (filters) => {
    try {
      const allVehicles = await getAllVehicles(filters);
      setVehicles(allVehicles);
    } catch (error) {
      toast.error(error.message || "Failed to load vehicles.");
      setVehicles([]); 
    }
  }, [getAllVehicles]); 

  // Initial load and **re-load whenever currentQuery changes**
  useEffect(() => {
    fetchVehicles(currentQuery);
  }, [fetchVehicles, currentQuery]);

  // Handler for applying filters (category, location, priceRange)
  const handleFilter = (filters) => {
    const query = {
      category: filters.category,
      location: filters.location,
      availability: 'Available', 
      sort: currentQuery.sort || 'newest', 
    };

    // Convert price range string (e.g., '51-100') to minPrice and maxPrice query params
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      query.minPrice = min;
      query.maxPrice = max;
    }

    // This state update triggers the useEffect to fetch new data
    setCurrentQuery(prev => ({ ...prev, ...query }));
  };

  // Handler for applying sort (priceAsc, priceDesc, name, newest)
  const handleSort = (sortOption) => {
    // This state update triggers the useEffect to fetch new, sorted data
    setCurrentQuery(prev => ({ ...prev, sort: sortOption }));
  };


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">All Vehicles</h1>
          <p className="text-gray-600 mb-8 dark:text-gray-400">Find the perfect vehicle for your journey</p>
          
          <SearchFilter onFilter={handleFilter} onSort={handleSort} />
          
          {vehicles.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center mt-8">
              <p className="text-gray-600 dark:text-gray-300 text-lg">No vehicles found matching your criteria.</p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {vehicles.map(vehicle => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVehicles;