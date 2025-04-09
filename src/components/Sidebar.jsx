import { Car, Fuel, Users, X } from 'lucide-react';
import { useContext } from 'react';
import { CarContext } from '../context/CarContext';

export const Sidebar = ({ filters, setFilters, handleFilterChange }) => {

    const { isSidebarOpen, setIsSidebarOpen, sortOrder, setSortOrder } = useContext(CarContext);

    const handleToggle = (filterName, value) => {
        const currentIndex = filters[filterName].indexOf(value);
        const newChecked = [...filters[filterName]];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        handleFilterChange(filterName, newChecked);
        setIsSidebarOpen(false);
    };

    const handlePriceChange = (value) => {
        setFilters((prev) => ({ ...prev, priceRange: value }));
    };

    const clearFilters = () => {
        handleFilterChange('brand', []);
        handleFilterChange('priceRange', 50000);
        handleFilterChange('fuelType', []);
        handleFilterChange('seatingCapacity', []);
        setSortOrder("");
    };

    return (
        <div className={`${isSidebarOpen ? "fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm md:static md:bg-transparent md:backdrop-blur-none z-10" : ""}`}>

            {/* Large Screen */}
            <div className='w-64 hidden bg-gray-50 shadow-xl p-5 md:flex flex-col h-full fixed left-0 top-0 border-r border-gray-200'>
                <div className="w-full mb-6 pb-3 border-b border-gray-300 flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-blue-600 flex items-center">
                        <Car className="mr-2" /> Car Finder
                    </h1>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Brand</h3>
                    <div className="space-y-2">
                        {['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi'].map((brand) => (
                            <label key={brand} className="flex items-center cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={filters.brand.includes(brand)}
                                    onChange={() => handleToggle('brand', brand)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                />
                                <span className="ml-2 text-gray-700">{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Price Range</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">$0</span>
                        <span className="text-sm text-gray-500">${filters.priceRange}</span>
                    </div>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="5000"
                            value={filters.priceRange}
                            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(filters.priceRange / 200000) * 100}%, #e5e7eb ${(filters.priceRange / 200000) * 100}%, #e5e7eb 100%)`,
                            }}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center mt-5">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Sort by Price</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Fuel className="h-4 w-4 mr-1" /> Fuel Type
                    </h3>
                    <div className="space-y-2">
                        {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((type) => (
                            <label key={type} className="flex items-center cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={filters.fuelType.includes(type)}
                                    onChange={() => handleToggle('fuelType', type)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                />
                                <span className="ml-2 text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Seating Capacity Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" /> Seating
                    </h3>
                    <div className="space-y-2">
                        {['2', '4', '5', '7'].map((seats) => (
                            <label key={seats} className="flex items-center cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={filters.seatingCapacity.includes(seats)}
                                    onChange={() => handleToggle('seatingCapacity', seats)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                />
                                <span className="ml-2 text-gray-700">
                                    {seats} {seats === '1' ? 'seat' : 'seats'}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters Button */}
                <button
                    onClick={clearFilters}
                    className="mt-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm transition"
                >
                    <X className="h-4 w-4" /> Clear Filters
                </button>
            </div>

            {/* Mobile Screens */}
            <div className={`fixed top-0 left-0 h-full w-[60%] bg-white overflow-y-auto hide-scrollbar border-t p-5 pt-20 md:hidden transition-all duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} `}>
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Brand</h3>
                    <div className="space-y-2">
                        {['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi'].map((brand) => (
                            <label key={brand} className="flex items-center cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={filters.brand.includes(brand)}
                                    onChange={() => handleToggle('brand', brand)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                />
                                <span className="ml-2 text-gray-700">{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Price Range</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">$0</span>
                        <span className="text-sm text-gray-500">${filters.priceRange}</span>
                    </div>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="150000"
                            step="5000"
                            value={filters.priceRange}
                            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(filters.priceRange / 150000) * 100}%, #e5e7eb ${(filters.priceRange / 150000) * 100}%, #e5e7eb 100%)`,
                            }}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center mt-5">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Sort by Price</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Fuel className="h-4 w-4 mr-1" /> Fuel Type
                    </h3>
                    <div className="space-y-2">
                        {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((type) => (
                            <label key={type} className="flex items-center cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={filters.fuelType.includes(type)}
                                    onChange={() => handleToggle('fuelType', type)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                />
                                <span className="ml-2 text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Seating Capacity Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" /> Seating
                    </h3>
                    <div className="space-y-2">
                        {['2', '4', '5', '7'].map((seats) => (
                            <label key={seats} className="flex items-center cursor-pointer hover:text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={filters.seatingCapacity.includes(seats)}
                                    onChange={() => handleToggle('seatingCapacity', seats)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                />
                                <span className="ml-2 text-gray-700">
                                    {seats} {seats === '1' ? 'seat' : 'seats'}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters Button */}
                <div className="">
                    <button
                        onClick={clearFilters}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm transition"
                    >
                        <X className="h-4 w-4" /> Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};