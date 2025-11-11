import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../pages/hooks/useVehicles';
import VehicleCard from '../components/common/VehicleCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1725916631378-358ebe6ad000?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwZHJhd2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600';

const Home = () => {
  const { getLatestVehicles, loading } = useVehicles();
  const [latestVehicles, setLatestVehicles] = useState([]);

  useEffect(() => {
    const fetchLatestVehicles = async () => {
      // Catch error to prevent app crash if API fails
      const vehicles = await getLatestVehicles().catch(() => []);
      // Limit to 3 vehicles to fit the current design grid
      setLatestVehicles(vehicles.slice(0, 3)); 
    };
    fetchLatestVehicles();
  }, [getLatestVehicles]);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Sleek Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">Trusted by 1000+ customers worldwide</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ride
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Premium vehicle rentals with seamless booking. Experience the freedom of the road with our curated fleet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/vehicles"
              className="group bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-3 shadow-lg"
            >
              <span>Explore Vehicles</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              to="/add-vehicle"
              className="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-3"
            >
              <span>List Your Vehicle</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST VEHICLES SECTION - IMPROVED PROFESSIONAL DESIGN */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider bg-blue-100/50 px-4 py-2 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                New Arrivals
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-white">
              Latest Additions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed dark:text-gray-400">
              Discover our **newest premium vehicles**, meticulously maintained and ready for your next adventure.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : latestVehicles.length > 0 ? (
            // Professional grid layout with enhanced card interaction
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {latestVehicles.map((vehicle) => (
                <div 
                  key={vehicle._id} 
                  // Added stronger hover effects: subtle lift and shadow change
                  className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800"
                >
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <p className="text-gray-600 text-xl font-semibold dark:text-gray-300">Nothing new yet!</p>
              <p className="text-gray-500 mt-2 dark:text-gray-400">Check back soon for the latest vehicle listings.</p>
            </div>
          )}

          <div className="text-center">
            <Link 
              to="/vehicles"
              className="inline-flex items-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <span>View Complete Fleet</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES & CATEGORIES SECTION */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Categories */}
            <div>
              <div className="mb-8">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider dark:text-blue-400">Categories</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6 dark:text-white">Explore by Type</h2>
                <p className="text-gray-600 text-lg dark:text-gray-400">Find the perfect vehicle for every occasion and need.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'SUV', desc: 'Spacious comfort', icon: '🚗', color: 'blue' },
                  { name: 'Electric', desc: 'Eco-friendly', icon: '⚡', color: 'green' },
                  { name: 'Sedan', desc: 'Business class', icon: '🎯', color: 'purple' },
                  { name: 'Van', desc: 'Group travel', icon: '👥', color: 'orange' }
                ].map((category, index) => (
                  <div 
                    key={category.name}
                    // NOTE: Tailwind JIT compilation requires utility classes to be fully present (e.g., bg-blue-100)
                    className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 
                      ${category.color === 'blue' ? 'bg-blue-100' : 
                        category.color === 'green' ? 'bg-green-100' :
                        category.color === 'purple' ? 'bg-purple-100' :
                        'bg-orange-100' // Default to orange
                      }
                    `}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 dark:text-white">{category.name}</h3>
                    <p className="text-gray-600 text-sm dark:text-gray-400">{category.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Features */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 lg:p-12 shadow-inner">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Why Choose GoRide?</h2>
              
              <div className="space-y-6 mb-8">
                {[
                  { title: 'Premium Quality', desc: 'All vehicles undergo rigorous maintenance checks' },
                  { title: 'Instant Booking', desc: 'Book your ride in minutes, not hours' },
                  { title: '24/7 Support', desc: 'Round-the-clock customer assistance' },
                  { title: 'Best Prices', desc: 'Competitive rates with no hidden fees' }
                ].map((feature, index) => (
                  <div key={feature.title} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-600 text-sm dark:text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-gray-600 text-sm dark:text-gray-400">Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">100+</div>
                  <div className="text-gray-600 text-sm dark:text-gray-400">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">1K+</div>
                  <div className="text-gray-600 text-sm dark:text-gray-400">Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust GoRide for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/vehicles"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Your Ride Now
            </Link>
            <Link 
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;