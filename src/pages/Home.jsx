import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../pages/hooks/useVehicles';
import VehicleCard from '../components/common/VehicleCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const { getLatestVehicles, loading } = useVehicles();
  const [latestVehicles, setLatestVehicles] = useState([]);

  useEffect(() => {
    const fetchLatestVehicles = async () => {
      const vehicles = await getLatestVehicles();
      setLatestVehicles(vehicles);
    };
    fetchLatestVehicles();
  }, [getLatestVehicles]);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to GoRide</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted partner for vehicle rentals and trip management. Find the perfect ride for your journey.
          </p>
          <Link 
            to="/vehicles"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Explore All Vehicles
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Vehicles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our newest additions to the fleet. Fresh vehicles added regularly for your convenience.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {latestVehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link 
              to="/vehicles"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Categories</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">SUV</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">SUVs</h3>
                  <p className="text-gray-600 text-sm mt-2">Spacious and comfortable for family trips</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold">EV</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Electric</h3>
                  <p className="text-gray-600 text-sm mt-2">Eco-friendly and cost-effective</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold">SED</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Sedans</h3>
                  <p className="text-gray-600 text-sm mt-2">Perfect for city driving and business trips</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-600 font-bold">VAN</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Vans</h3>
                  <p className="text-gray-600 text-sm mt-2">Ideal for group travel and cargo</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About GoRide</h2>
              <p className="text-gray-600 mb-4">
                GoRide is your premier vehicle booking platform that connects vehicle owners with travelers. 
                We make renting vehicles simple, secure, and convenient.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're planning a family vacation, business trip, or weekend getaway, 
                find the perfect vehicle that suits your needs and budget.
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600 text-sm">Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-gray-600 text-sm">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1K+</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;