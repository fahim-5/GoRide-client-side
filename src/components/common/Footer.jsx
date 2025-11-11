import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h2 className="text-2xl font-bold text-white">GoRide</h2>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for vehicle rentals and trip management. Find the perfect ride for your journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-black text-gray-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-700 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/vehicles" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Browse Vehicles
                </a>
              </li>
              <li>
                <a href="/add-vehicle" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  List Your Vehicle
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Vehicle Types</h3>
            <ul className="space-y-3">
              <li>
                <a href="/vehicles?category=Sedan" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Sedan Cars
                </a>
              </li>
              <li>
                <a href="/vehicles?category=SUV" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  SUVs
                </a>
              </li>
              <li>
                <a href="/vehicles?category=Electric" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Electric Vehicles
                </a>
              </li>
              <li>
                <a href="/vehicles?category=Van" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Vans
                </a>
              </li>
              <li>
                <a href="/vehicles" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  All Vehicles
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-400">123 Street, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 flex-shrink-0" size={16} />
                <span className="text-gray-400">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" size={16} />
                <span className="text-gray-400">support@goride.com</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} GoRide. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;