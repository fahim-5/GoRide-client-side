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

      <section className="relative py-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 overflow-hidden">
  {/* Background Ornaments */}
  <div className="absolute top-10 left-16 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl dark:bg-blue-700/10"></div>
  <div className="absolute bottom-20 right-16 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl dark:bg-indigo-700/10"></div>

  <div className="container mx-auto px-4 relative z-10">
    {/* Header Section */}
    <div className="text-center mb-24">
      <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span className="text-white font-semibold text-sm uppercase tracking-widest">
          Fresh Arrivals
        </span>
      </div>

      

      <div className="w-28 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>

      
    </div>

    {/* Content Area */}
    {loading ? (
      <div className="flex justify-center items-center py-32">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 font-medium text-sm">
            Loading...
          </span>
        </div>
      </div>
    ) : latestVehicles.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
        {latestVehicles.map((vehicle, index) => (
          <div
            key={vehicle._id}
            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white dark:bg-gray-800"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Premium badge */}
            {index < 2 && (
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                PREMIUM
              </div>
            )}
            <VehicleCard vehicle={vehicle} />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-24 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="relative w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 dark:from-blue-900/30 dark:to-indigo-900/30">
          <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 dark:text-white">Nothing new yet!</h3>
        <p className="text-gray-600 max-w-md mx-auto dark:text-gray-400">
          We’re curating new premium rides for your next adventure. Please check back soon!
        </p>
      </div>
    )}

    {/* CTA */}
    <div className="text-center">
      <Link
        to="/vehicles"
        className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
      >
        <span>Explore Complete Fleet</span>
        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>

      <p className="text-gray-500 text-sm mt-6 dark:text-gray-400">
        Over <span className="font-semibold text-blue-600 dark:text-blue-400">50+</span> premium vehicles available — tailored for your comfort and class.
      </p>
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