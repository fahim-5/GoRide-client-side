import { useState } from 'react';

const SearchFilter = ({ onFilter, onSort, isDark }) => {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: '',
    availability: ''
  });

  const [sortBy, setSortBy] = useState('');

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSort(value);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      location: '',
      priceRange: '',
      availability: ''
    };
    setFilters(clearedFilters);
    setSortBy('');
    onFilter(clearedFilters);
    onSort('');
  };

  // Dynamic styles for theme
  const containerClass = isDark
    ? 'bg-gray-800/90 border border-gray-700 text-gray-200 shadow-lg'
    : 'bg-white border border-gray-200 text-gray-800 shadow-md';
  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const inputClass = isDark
    ? 'bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500 focus:ring-blue-500'
    : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:ring-blue-500';
  const buttonClass = isDark
    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    : 'bg-gray-500 text-white hover:bg-gray-600';

  return (
    <div className={`${containerClass} p-6 rounded-lg mb-6 transition-all duration-300`}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
          >
            <option value="">All Categories</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Electric">Electric</option>
            <option value="Van">Van</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Location</label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            placeholder="Search location"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
          >
            <option value="">Any Price</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201+">$201+</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Availability</label>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
          >
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      
    </div>
  );
};

export default SearchFilter;
