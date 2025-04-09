import React from 'react'
import { Fuel, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileSearchBox from './MobileSearchBox';

const Cars = ({ indexOfFirstCar, indexOfLastCar, filteredCars, currentCars, currentPage, totalPages, paginate }) => {

    const navigate = useNavigate();

    return (
        <div className="p-6">
            <div className='mb-5 md:hidden'>
                <MobileSearchBox />
            </div>

            {filteredCars.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentCars.map((car, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <div className="h-48 bg-gray-200 overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            {car.brand}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm mb-3">
                                        <span className="flex items-center mr-3">
                                            <Fuel className="h-4 w-4 mr-1" /> {car.fuelType}
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" /> {car.seatingCapacity} seats
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-900">
                                            ${car.price.toLocaleString()}
                                        </span>
                                        <button onClick={() => navigate(`/car/${car.name}`, { state: car })} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-3 py-1 rounded-lg text-sm transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <nav className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === number ? 'bg-blue-50 text-blue-600 border-blue-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight />
                            </button>
                        </nav>
                    </div>

                    <div className="text-center text-sm text-gray-500 mt-2">
                        Showing {indexOfFirstCar + 1}-{Math.min(indexOfLastCar, filteredCars.length)} of {filteredCars.length} cars
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-500 text-lg">No cars match your filters</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results</p>
                </div>
            )}
        </div>
    )
}

export default Cars