// components/common/VehicleModal.jsx
import { useEffect } from 'react';

const VehicleModal = ({ vehicle, isOpen, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Modal Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 dark:bg-gray-700/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 shadow-lg"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-80 lg:h-full min-h-[400px]">
            <img
              src={vehicle.images?.[0] || '/default-car.jpg'}
              alt={vehicle.make}
              className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
            />
            {/* Image Gallery Indicator */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {vehicle.images.slice(0, 4).map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-white/80 rounded-full"></div>
                ))}
                {vehicle.images.length > 4 && (
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                )}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                {vehicle.isPremium && (
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </span>
                )}
                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                  {vehicle.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-xl text-blue-600 font-semibold dark:text-blue-400">
                ${vehicle.pricePerDay}/day
              </p>
            </div>

            {/* Key Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="text-center">
                <div className="text-gray-500 text-sm dark:text-gray-400">Year</div>
                <div className="font-semibold text-gray-900 dark:text-white">{vehicle.year}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm dark:text-gray-400">Fuel Type</div>
                <div className="font-semibold text-gray-900 dark:text-white">{vehicle.fuelType}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm dark:text-gray-400">Seats</div>
                <div className="font-semibold text-gray-900 dark:text-white">{vehicle.seats}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm dark:text-gray-400">Transmission</div>
                <div className="font-semibold text-gray-900 dark:text-white">{vehicle.transmission}</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {vehicle.description || `Experience the perfect blend of performance and comfort with this ${vehicle.year} ${vehicle.make} ${vehicle.model}. This vehicle offers exceptional driving dynamics and premium features that make every journey memorable.`}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Air Conditioning',
                  'Bluetooth',
                  'GPS Navigation',
                  'Backup Camera',
                  'Leather Seats',
                  'Sunroof'
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Book Now
              </button>
              <button className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 transition-colors duration-200">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;