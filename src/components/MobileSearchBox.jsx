import React, { useEffect, useMemo, useRef, useState } from 'react'
import carData from '../utils/cars.json'
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'

const SearchBox = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const filteredCars = useMemo(() => {
        if (!searchQuery) return [];
        const query = searchQuery.toLowerCase();
        return carData.filter(car =>
            car.name.toLowerCase().includes(query) ||
            car.brand.toLowerCase().includes(query)
        );
    }, [carData, searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="flex items-center w-full justify-between space-x-4">
            <div className="relative w-full" ref={searchRef}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {isSearchFocused && searchQuery && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer"
                                    onClick={() => {
                                        navigate(`/car/${car.name}`, { state: car })
                                        setIsSearchFocused(false);
                                    }}
                                >
                                    <div className="flex-shrink-0 w-16 h-12 bg-gray-100 rounded overflow-hidden">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">{car.name}</p>
                                        <p className="text-sm text-gray-500">{car.brand}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No cars found matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBox