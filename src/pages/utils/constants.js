export const APP_CONFIG = {
  name: "GoRide",
  tagline: "Vehicle Booking & Trip Management Platform",
  description: "Book vehicles easily for your travel needs"
};

export const VEHICLE_CATEGORIES = [
  "Sedan",
  "SUV", 
  "Electric",
  "Van"
];

export const VEHICLE_TYPES = [
  "Electric",
  "Gasoline",
  "Diesel",
  "Hybrid"
];

export const AVAILABILITY_STATUS = {
  AVAILABLE: "Available",
  BOOKED: "Booked"
};

export const PRICE_RANGES = [
  { label: "Any Price", value: "" },
  { label: "$0 - $50", value: "0-50" },
  { label: "$51 - $100", value: "51-100" },
  { label: "$101 - $200", value: "101-200" },
  { label: "$201+", value: "201+" }
];

export const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A to Z", value: "name" },
  { label: "Newest First", value: "newest" }
];