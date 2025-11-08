import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            GoRide
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/vehicles" className="text-gray-700 hover:text-blue-600 transition-colors">
              All Vehicles
            </Link>
            {user && (
              <>
                <Link to="/add-vehicle" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Add Vehicle
                </Link>
                <Link to="/my-vehicles" className="text-gray-700 hover:text-blue-600 transition-colors">
                  My Vehicles
                </Link>
                <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
                  My Bookings
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <img 
                      src={user.photoURL || '/default-avatar.png'} 
                      alt={user.displayName || 'User'} 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700">{user.displayName || 'User'}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/vehicles" className="text-gray-700 hover:text-blue-600 transition-colors">
                All Vehicles
              </Link>
              {user && (
                <>
                  <Link to="/add-vehicle" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Add Vehicle
                  </Link>
                  <Link to="/my-vehicles" className="text-gray-700 hover:text-blue-600 transition-colors">
                    My Vehicles
                  </Link>
                  <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
                    My Bookings
                  </Link>
                </>
              )}
              {user ? (
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  <img 
                    src={user.photoURL || '/default-avatar.png'} 
                    alt={user.displayName || 'User'} 
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-700">{user.displayName || 'User'}</span>
                  <button 
                    onClick={handleLogout}
                    className="ml-auto bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-center hover:bg-green-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;