import { useState, useEffect } from 'react';
import { useAuth } from '../../pages/hooks/useAuth';
import { useBookings } from '../hooks/useBookings'
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MyBookings = () => {
  const { user } = useAuth();
  const { getMyBookings, loading } = useBookings();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        const myBookings = await getMyBookings(user.email);
        setBookings(myBookings);
      }
    };
    fetchBookings();
  }, [user, getMyBookings]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>
          
          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">No bookings found.</p>
              <p className="text-gray-500 mt-2">Start by booking a vehicle from the All Vehicles page.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={booking.vehicle.coverImage} 
                          alt={booking.vehicle.vehicleName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {booking.vehicle.vehicleName}
                          </h3>
                          <p className="text-gray-600">Owner: {booking.vehicle.owner}</p>
                          <p className="text-gray-600">Category: {booking.vehicle.category}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Booking Dates:</span>
                          <p className="text-gray-600">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Total Price:</span>
                          <p className="text-blue-600 font-semibold">${booking.totalPrice}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3">
                          <span className="font-medium text-gray-700">Notes:</span>
                          <p className="text-gray-600">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;