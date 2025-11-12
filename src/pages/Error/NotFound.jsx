import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

const NotFound = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    document.title = 'Page Not Found - TravelEase';
    
    return () => {
      document.title = 'TravelEase';
    };
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="relative mb-8">
            <div className="relative z-10">
              <div className={`text-9xl font-bold mb-4 tracking-tighter ${
                isDark 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600'
              }`}>
                404
              </div>
              
              <div className="absolute -top-4 -left-8 w-20 h-20">
                <div className={`absolute inset-0 rounded-full animate-bounce ${
                  isDark ? 'bg-red-500/20' : 'bg-red-200'
                }`} style={{ animationDelay: '0.1s' }}></div>
              </div>
              <div className="absolute -bottom-4 -right-8 w-16 h-16">
                <div className={`absolute inset-0 rounded-full animate-bounce ${
                  isDark ? 'bg-purple-500/20' : 'bg-purple-200'
                }`} style={{ animationDelay: '0.3s' }}></div>
              </div>
              <div className="absolute top-1/2 -right-12 w-12 h-12">
                <div className={`absolute inset-0 rounded-full animate-pulse ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-200'
                }`}></div>
              </div>
            </div>
            
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-red-300 rounded-full"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-purple-300 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-16 h-16 border-2 border-blue-300 rounded-full"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className={`mb-8 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <div className="flex items-center justify-center mb-6">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  isDark ? 'bg-red-400' : 'bg-red-500'
                }`}></div>
                <h1 className={`text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Oops! Page Not Found
                </h1>
                <div className={`w-2 h-2 rounded-full ml-3 ${
                  isDark ? 'bg-purple-400' : 'bg-purple-500'
                }`}></div>
              </div>
              <p className="text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for seems to have taken a detour. 
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-w-[200px] text-center"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Back to Home</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/vehicles"
                className={`group border-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-w-[200px] text-center ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10' 
                    : 'border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Browse Vehicles</span>
                </span>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 min-w-[200px] text-center ${
                  isDark 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Go Back</span>
                </span>
              </button>
            </div>

            <div className={`rounded-2xl p-8 transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/80 backdrop-blur-sm border border-gray-200'
            }`}>
              <h3 className={`text-xl font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                While you're here...
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-blue-50 hover:bg-blue-100'
                }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto ${
                    isDark ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <svg className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h4 className={`font-semibold mb-2 text-center ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Search Vehicles</h4>
                  <p className={`text-sm text-center ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Find your perfect ride from our extensive collection</p>
                </div>
                
                <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-green-50 hover:bg-green-100'
                }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto ${
                    isDark ? 'bg-green-900/50' : 'bg-green-100'
                  }`}>
                    <svg className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className={`font-semibold mb-2 text-center ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Get Help</h4>
                  <p className={`text-sm text-center ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Contact our support team for assistance</p>
                </div>
                
                <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-purple-50 hover:bg-purple-100'
                }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto ${
                    isDark ? 'bg-purple-900/50' : 'bg-purple-100'
                  }`}>
                    <svg className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className={`font-semibold mb-2 text-center ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Learn More</h4>
                  <p className={`text-sm text-center ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Discover how TravelEase makes renting easy</p>
                </div>
              </div>

              <div className={`text-center p-4 rounded-xl ${
                isDark ? 'bg-gray-700/30' : 'bg-gray-50'
              }`}>
                <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Still can't find what you're looking for?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Contact our support team:</span>
                  <a 
                    href="mailto:support@travelease.com" 
                    className={`font-semibold transition-colors duration-300 ${
                      isDark 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    support@travelease.com
                  </a>
                </div>
              </div>
            </div>

            <div className={`mt-8 text-sm transition-colors duration-300 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <p>Error Code: 404 | Page Not Found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute -top-1/2 -left-1/2 w-full h-full opacity-10 ${
          isDark ? 'text-purple-500' : 'text-purple-300'
        }`}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;