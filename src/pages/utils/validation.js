export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  
  return {
    isValid: hasUpperCase && hasLowerCase && hasMinLength,
    errors: {
      hasUpperCase,
      hasLowerCase, 
      hasMinLength
    }
  };
};

export const validateVehicleData = (vehicleData) => {
  const errors = {};
  
  if (!vehicleData.vehicleName?.trim()) {
    errors.vehicleName = 'Vehicle name is required';
  }
  
  if (!vehicleData.owner?.trim()) {
    errors.owner = 'Owner name is required';
  }
  
  if (!vehicleData.category) {
    errors.category = 'Category is required';
  }
  
  if (!vehicleData.pricePerDay || vehicleData.pricePerDay <= 0) {
    errors.pricePerDay = 'Valid price is required';
  }
  
  if (!vehicleData.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  if (!vehicleData.description?.trim()) {
    errors.description = 'Description is required';
  }
  
  if (!vehicleData.coverImage?.trim()) {
    errors.coverImage = 'Cover image is required';
  }
  
  if (!vehicleData.categories) {
    errors.categories = 'Vehicle type is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBookingData = (bookingData) => {
  const errors = {};
  
  if (!bookingData.startDate) {
    errors.startDate = 'Start date is required';
  }
  
  if (!bookingData.endDate) {
    errors.endDate = 'End date is required';
  }
  
  if (bookingData.startDate && bookingData.endDate) {
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    
    if (end <= start) {
      errors.endDate = 'End date must be after start date';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};