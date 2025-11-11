import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaTag, FaDollarSign } from 'react-icons/fa';

/**
 * Renders a card for a single vehicle with a link to its details page.
 * @param {object} vehicle The vehicle object containing details like _id, name, price, etc.
 */
const VehicleCard = ({ vehicle }) => {
  const { 
    _id, 
    vehicleName, 
    coverImage, 
    pricePerDay, 
    category, 
    location 
  } = vehicle;

  // We use the 'Link' component from react-router-dom to handle navigation.
  return (
    <Link 
      to={`/vehicle/${_id}`} 
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
      aria-label={`View details for ${vehicleName}`}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={vehicleName} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
          {vehicleName}
        </h3>
        
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-extrabold text-2xl mb-4">
          <FaDollarSign className="mr-1" size={18} />
          <span>{pricePerDay}</span>
          <span className="text-base font-medium text-gray-500 dark:text-gray-400 ml-1">/ day</span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FaTag className="text-blue-500 mr-2" />
            <span>{category}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;