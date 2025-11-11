import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../pages/hooks/useVehicles';
import VehicleCard from '../components/common/VehicleCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

// The image link provided by the user
const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1725916631378-358ebe6ad000?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwZHJhd2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600';


const Home = () => {
  const { getLatestVehicles, loading } = useVehicles();
  const [latestVehicles, setLatestVehicles] = useState([]);

  useEffect(() => {
    const fetchLatestVehicles = async () => {
      // Ensure data is null/empty if the fetch fails
      const vehicles = await getLatestVehicles().catch(() => []);
      setLatestVehicles(vehicles);
    };
    fetchLatestVehicles();
  }, [getLatestVehicles]);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION: Updated to use the image as background with a dark overlay 
      */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
      >
        {/* Overlay for better text readability and a branded look */}
        <div className="absolute inset-0 bg-blue-900 opacity-70"></div> 
        
        {/* Content container - must be relative with a higher z-index than the overlay */}
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight">Welcome to GoRide</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto font-light">
            Your trusted partner for vehicle rentals and trip management. Find the perfect ride for your next journey today.
          </p>
          <Link 
            to="/vehicles"
            className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105 inline-block shadow-2xl"
          >
            Explore All Vehicles →
          </Link>
        </div>
      </section>

      {/* LATEST VEHICLES SECTION 
      */}
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
            latestVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {latestVehicles.slice(0, 3).map((vehicle) => ( // Limiting to 3 for the home page preview
                        <VehicleCard key={vehicle._id} vehicle={vehicle} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-10">
                    <p className="text-gray-500 text-lg">No vehicles found yet.</p>
                </div>
            )
          )}

          <div className="text-center">
            <Link 
              to="/vehicles"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES & ABOUT SECTION 
      */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Categories</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                    <span className="text-blue-600 font-bold">SUV</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">SUVs</h3>
                  <p className="text-gray-600 text-sm mt-2">Spacious and comfortable for family trips</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
                    <span className="text-green-600 font-bold">EV</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Electric</h3>
                  <p className="text-gray-600 text-sm mt-2">Eco-friendly and cost-effective</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-purple-200">
                    <span className="text-purple-600 font-bold">SED</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Sedans</h3>
                  <p className="text-gray-600 text-sm mt-2">Perfect for city driving and business trips</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-200">
                    <span className="text-orange-600 font-bold">VAN</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Vans</h3>
                  <p className="text-gray-600 text-sm mt-2">Ideal for group travel and cargo</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About GoRide</h2>
              <p className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4">
                **GoRide** is your premier vehicle booking platform that connects vehicle owners with travelers. 
                We make renting vehicles simple, secure, and convenient.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're planning a family vacation, business trip, or weekend getaway, 
                find the perfect vehicle that suits your needs and budget.
              </p>
              <div className="flex space-x-8 justify-between">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600">500+</div>
                  <div className="text-gray-600 text-sm">Vehicles Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600">100+</div>
                  <div className="text-gray-600 text-sm">Service Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600">1K+</div>
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