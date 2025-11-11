import { useState, useEffect } from 'react';
import VehicleCard from '../../components/common/VehicleCard';
import SearchFilter from '../../components/ui/SearchFilter'; // Assuming this component exists
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useVehicles } from '../hooks/useVehicles'; // Assuming this hook manages API calls

const AllVehicles = () => {
  const { getAllVehicles, loading } = useVehicles();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    const fetchVehicles = async () => {
      // Fetch all vehicles without initial filters
      const allVehicles = await getAllVehicles({}); 
      setVehicles(allVehicles);
      setFilteredVehicles(allVehicles);
    };
    fetchVehicles();
  }, [getAllVehicles]);

  // Handler for advanced filter/search from SearchFilter component
  const handleFilter = async (filters) => {
    setCurrentFilters(filters);

    // If you implement filters on the backend (recommended for large datasets), 
    // you would call an API endpoint here:
    // const newFilteredVehicles = await getAllVehicles(filters);
    // setVehicles(newFilteredVehicles); // Update base state if fetching filtered data
    // setFilteredVehicles(newFilteredVehicles);

    // --- TEMPORARY CLIENT-SIDE FILTERING (Keep if backend filter is not ready) ---
    let filtered = vehicles;

    if (filters.category) {
      filtered = filtered.filter(vehicle => vehicle.category === filters.category);
    }
    if (filters.location) {
      filtered = filtered.filter(vehicle => 
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.priceRange) {
      // Example price range logic
      filtered = filtered.filter(vehicle => {
        const price = vehicle.pricePerDay;
        if (filters.priceRange === '0-50') return price >= 0 && price <= 50;
        if (filters.priceRange === '51-100') return price > 50 && price <= 100;
        if (filters.priceRange === '101+') return price > 100;
        return true;
      });
    }
    setFilteredVehicles(filtered);
    // --------------------------------------------------------------------------
  };

  const handleSort = (sortOption) => {
    const sorted = [...filteredVehicles];

    switch (sortOption) {
      case 'priceLowToHigh':
        sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'priceHighToLow':
        sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'name':
        sorted.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredVehicles(sorted);
  };

  if (loading) {
    return <LoadingSpinner />; //
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Vehicles</h1>
          <p className="text-gray-600 mb-8">Find the perfect vehicle for your journey</p>
          
          <SearchFilter onFilter={handleFilter} onSort={handleSort} />
          
          {filteredVehicles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">No vehicles found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredVehicles.map(vehicle => (
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