import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingModal from '../../components/ui/BookingModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';
// Corrected to point two levels up to the context directory
import { useAuth } from '../../context/AuthContext'; 
import { useVehicles } from '../hooks/useVehicles';
import { useBookings } from '../hooks/useBookings';

const VehicleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getVehicle, loading } = useVehicles();
  const { createBooking } = useBookings();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleData = await getVehicle(id);
        setVehicle(vehicleData);
      } catch (error) {
        // Log error for debugging, then show user feedback
        console.error("Vehicle fetch failed:", error); 
        toast.error('Vehicle not found.');
        navigate('/vehicles');
      }
    };
    fetchVehicle();
  }, [id, getVehicle, navigate]);

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book a vehicle.');
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  const handleBookingConfirm = async (bookingData) => {
    try {
      await createBooking({
        vehicleId: vehicle._id,
        userEmail: user.email,
        ...bookingData
      });
      toast.success('Booking request submitted successfully!');
      setShowBookingModal(false);
    } catch (error) {
      console.error("Booking failed:", error); 
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  if (loading || !vehicle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={vehicle.coverImage} 
                alt={vehicle.vehicleName}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{vehicle.vehicleName}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vehicle.availability === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.availability}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium w-24">Owner:</span>
                  <span>{vehicle.owner}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium w-24">Category:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {vehicle.category}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium w-24">Type:</span>
                  <span>{vehicle.category}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium w-24">Location:</span>
                  <span>{vehicle.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium w-24">Price:</span>
                  <span className="text-2xl font-bold text-blue-600">${vehicle.pricePerDay}/day</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
              </div>

              <button
                onClick={handleBookNow}
                disabled={vehicle.availability !== 'Available'}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  vehicle.availability === 'Available'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
              >
                {vehicle.availability === 'Available' ? 'Book Now' : 'Currently Booked'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        vehicle={vehicle}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onConfirm={handleBookingConfirm}
      />
    </div>
  );
};

export default VehicleDetails;