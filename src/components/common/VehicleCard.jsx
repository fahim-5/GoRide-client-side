import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={vehicle.coverImage} 
        alt={vehicle.vehicleName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicleName}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            vehicle.availability === 'Available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {vehicle.availability}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">Owner: {vehicle.owner}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-600 font-bold text-lg">${vehicle.pricePerDay}/day</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {vehicle.category}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{vehicle.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{vehicle.location}</span>
          <span>{vehicle.categories}</span>
        </div>
        
        <Link 
          to={`/vehicle/${vehicle._id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;