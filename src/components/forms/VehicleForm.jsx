import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const VehicleForm = ({ vehicle, onSubmit, loading, isUpdate = false }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    vehicleName: '',
    owner: '',
    category: '',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
    coverImage: '',
    userEmail: '',
    categories: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle && isUpdate) {
      // For update - use all vehicle data including userEmail
      setFormData({
        vehicleName: vehicle.vehicleName || '',
        owner: vehicle.owner || '',
        category: vehicle.category || '',
        pricePerDay: vehicle.pricePerDay || '',
        location: vehicle.location || '',
        availability: vehicle.availability || 'Available',
        description: vehicle.description || '',
        coverImage: vehicle.coverImage || '',
        userEmail: vehicle.userEmail || '', // Keep original userEmail for updates
        categories: vehicle.categories || ''
      });
    } else if (user) {
      // For new vehicle - set user email and name
      setFormData(prev => ({
        ...prev,
        userEmail: user.email,
        owner: user.displayName || user.email.split('@')[0] // Fallback to email username
      }));
    }
  }, [vehicle, user, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicleName.trim()) newErrors.vehicleName = 'Vehicle name is required';
    if (!formData.owner.trim()) newErrors.owner = 'Owner name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.pricePerDay || formData.pricePerDay <= 0) newErrors.pricePerDay = 'Valid price is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.coverImage.trim()) newErrors.coverImage = 'Cover image URL is required';
    if (!formData.categories) newErrors.categories = 'Vehicle type is required';
    if (!formData.userEmail) newErrors.userEmail = 'Email is required';
    
    // Validate URL format
    if (formData.coverImage.trim()) {
      try {
        new URL(formData.coverImage);
      } catch (e) {
        newErrors.coverImage = 'Please enter a valid URL';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Prepare data for submission
    const submitData = {
      vehicleName: formData.vehicleName.trim(),
      owner: formData.owner.trim(),
      category: formData.category,
      pricePerDay: Number(formData.pricePerDay),
      location: formData.location.trim(),
      availability: formData.availability,
      description: formData.description.trim(),
      coverImage: formData.coverImage.trim(),
      categories: formData.categories,
      // userEmail is automatically set by backend for new vehicles
      // For updates, it's preserved from the original vehicle
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isUpdate ? 'Update Vehicle' : 'Add New Vehicle'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Name *
            </label>
            <input
              type="text"
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.vehicleName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Toyota Corolla"
            />
            {errors.vehicleName && <p className="text-red-500 text-sm mt-1">{errors.vehicleName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name *
            </label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.owner ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Owner's full name"
            />
            {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type *
            </label>
            <select
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.categories ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Type</option>
              <option value="Electric">Electric</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Per Day ($) *
            </label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.pricePerDay ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 70"
              min="1"
              step="0.01"
            />
            {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability *
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Dhaka, Bangladesh"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image URL *
          </label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.coverImage ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
          
          {/* Image Preview */}
          {formData.coverImage && !errors.coverImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img 
                src={formData.coverImage} 
                alt="Vehicle preview" 
                className="w-full max-w-xs h-32 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the vehicle features, condition, and amenities..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Email *
          </label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">
            This email cannot be changed and will be used to identify your vehicles
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Processing...' : (isUpdate ? 'Update Vehicle' : 'Add Vehicle')}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;