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
      try {
        console.log('🔄 Fetching latest vehicles...');
        const response = await getLatestVehicles();
        console.log('📦 Raw API response:', response);
        
        // ✅ SAFE DATA PROCESSING - Handle different response formats
        let vehiclesArray = [];
        
        if (Array.isArray(response)) {
          // Case 1: Response is already an array
          vehiclesArray = response;
          console.log('✅ Using response as direct array');
        } else if (response && response.success && Array.isArray(response.data)) {
          // Case 2: { success: true, data: [], count: number }
          vehiclesArray = response.data;
          console.log('✅ Using response.data from success object');
        } else if (response && Array.isArray(response.data)) {
          // Case 3: { data: [], count: number }
          vehiclesArray = response.data;
          console.log('✅ Using response.data from data object');
        } else if (response && Array.isArray(response.vehicles)) {
          // Case 4: { vehicles: [] }
          vehiclesArray = response.vehicles;
          console.log('✅ Using response.vehicles');
        } else {
          // Case 5: Unexpected format or empty
          console.warn('❌ Unexpected response format:', response);
          vehiclesArray = [];
        }
        
        // Get latest 6 vehicles and ensure they're valid
        const validVehicles = vehiclesArray
          .filter(vehicle => vehicle && vehicle._id) // Filter out invalid vehicles
          .slice(0, 6); // Take first 6
        
        console.log('🚗 Final 6 vehicles:', validVehicles);
        setLatestVehicles(validVehicles);
        
      } catch (error) {
        console.error('❌ Error fetching vehicles:', error);
        setLatestVehicles([]);
      }
    };
    
    fetchLatestVehicles();
  }, [getLatestVehicles]);

  // Debug: Log current state
  useEffect(() => {
    console.log('📊 Current latestVehicles state:', latestVehicles);
  }, [latestVehicles]);

  return (
    <div className="min-h-screen">
      {/* BANNER SECTION - Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
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
            Travel With
            <span className="block bg-gradient-to-r from-green-200 to-green-300 bg-clip-text text-transparent">
              Ease
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Premium vehicle rentals with seamless booking. Experience the freedom of the road with our curated fleet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/vehicles"
              className="group bg-white text-green-900 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-3 shadow-lg"
            >
              <span>All Vehicles</span>
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

      {/* DYNAMIC SECTION - Latest 6 Vehicles */}
      <section className="relative py-28 bg-gradient-to-br from-gray-50 via-green-50/30 to-green-50/20 overflow-hidden">
        {/* Background Ornaments */}
        <div className="absolute top-10 left-16 w-32 h-32 bg-green-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-green-400/10 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-full shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="text-white font-semibold text-sm uppercase tracking-widest">
                Latest Vehicles
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Recently Added <span className="text-green-600">Rides</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our newest additions to the fleet. Fresh vehicles added regularly for your convenience.
            </p>

            <div className="w-28 h-1.5 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-8 rounded-full"></div>
          </div>

          {/* Latest Vehicles Grid - 6 vehicles */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <LoadingSpinner />
              <span className="ml-3 text-gray-600">Loading latest vehicles...</span>
            </div>
          ) : latestVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {latestVehicles.map((vehicle, index) => (
                  <div
                    key={vehicle._id || index}
                    className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
                  >
                    {/* New badge for recently added vehicles */}
                    <div className="absolute top-4 left-4 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      NEW
                    </div>
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
              
              {/* Debug info - remove in production */}
              <div className="text-center text-sm text-gray-500 mb-4">
                Showing {latestVehicles.length} vehicle{latestVehicles.length !== 1 ? 's' : ''}
              </div>
            </>
          ) : (
            <div className="text-center py-24 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200/50">
              <div className="relative w-32 h-32 bg-gradient-to-br from-green-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No vehicles available yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Be the first to list your vehicle and start earning!
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/vehicles"
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              <span>View All Vehicles</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ... rest of your existing static sections remain the same ... */}
      {/* STATIC SECTION 1 - Top Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top <span className="text-green-600">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated vehicle categories for every travel need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'SUV', 
                desc: 'Spacious and comfortable for family trips and adventures', 
                icon: '🚗',
                count: '50+ Vehicles',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                name: 'Electric', 
                desc: 'Eco-friendly and cost-effective for city driving', 
                icon: '⚡',
                count: '30+ Vehicles',
                color: 'from-green-500 to-green-600'
              },
              { 
                name: 'Vans', 
                desc: 'Ideal for group travel, cargo, and large families', 
                icon: '👥',
                count: '25+ Vehicles',
                color: 'from-orange-500 to-orange-600'
              },
              { 
                name: 'Sedans', 
                desc: 'Perfect for business trips and city commuting', 
                icon: '🎯',
                count: '45+ Vehicles',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((category, index) => (
              <div 
                key={category.name}
                className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-white to-gray-50"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{category.desc}</p>
                <div className="text-green-600 font-semibold">{category.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATIC SECTION 2 - About TravelEase */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="mb-8">
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">About TravelEase</h2>
                <p className="text-gray-600 text-lg mb-6">
                  TravelEase is your premier vehicle booking platform that connects vehicle owners with travelers. 
                  We make renting vehicles simple, secure, and convenient.
                </p>
                <p className="text-gray-600 text-lg mb-8">
                  Whether you're planning a family vacation, business trip, or weekend getaway, 
                  find the perfect vehicle that suits your needs and budget.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                  <div className="text-gray-600">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>

              <Link 
                to="/about"
                className="inline-flex items-center space-x-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                <span>Learn more about us</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              {[
                {
                  title: 'Easy Booking',
                  desc: 'Book your preferred vehicle in just a few clicks',
                  icon: '📅'
                },
                {
                  title: 'Verified Owners',
                  desc: 'All vehicle owners are thoroughly verified for your safety',
                  icon: '✅'
                },
                {
                  title: 'Best Prices',
                  desc: 'Competitive pricing with no hidden charges',
                  icon: '💰'
                },
                {
                  title: '24/7 Support',
                  desc: 'Round-the-clock customer support for all your needs',
                  icon: '📞'
                }
              ].map((feature, index) => (
                <div key={feature.title} className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-green-100 text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TravelEase for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/vehicles"
              className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse All Vehicles
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