import { useState, useEffect } from 'react'
import VehicleCard from '../../components/common/VehicleCard';
import SearchFilter from '../../components/ui/SearchFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';
// import { useAuth } from '../hooks/useAuth';
import { useVehicles } from '../hooks/useVehicles';
// import { useBookings } from '../../hooks/useBookings';

const AllVehicles = () => {
  const { getAllVehicles, loading } = useVehicles();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const allVehicles = await getAllVehicles();
      setVehicles(allVehicles);
      setFilteredVehicles(allVehicles);
    };
    fetchVehicles();
  }, [getAllVehicles]);

  const handleFilter = (filters) => {
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
      switch (filters.priceRange) {
        case '0-50':
          filtered = filtered.filter(vehicle => vehicle.pricePerDay <= 50);
          break;
        case '51-100':
          filtered = filtered.filter(vehicle => vehicle.pricePerDay > 50 && vehicle.pricePerDay <= 100);
          break;
        case '101-200':
          filtered = filtered.filter(vehicle => vehicle.pricePerDay > 100 && vehicle.pricePerDay <= 200);
          break;
        case '201+':
          filtered = filtered.filter(vehicle => vehicle.pricePerDay > 200);
          break;
        default:
          break;
      }
    }

    if (filters.availability) {
      filtered = filtered.filter(vehicle => vehicle.availability === filters.availability);
    }

    setFilteredVehicles(filtered);
  };

  const handleSort = (sortBy) => {
    let sorted = [...filteredVehicles];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
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
    return <LoadingSpinner />;
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
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