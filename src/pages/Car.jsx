import React, { useContext, useEffect } from 'react'
import { Fuel, Users, Star, ArrowLeft, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CarContext } from '../context/CarContext';

const Car = () => {

    const location = useLocation();
    const car = location.state || {};
    const { cars, getCars, addCar } = useContext(CarContext);

    useEffect(() => {
        getCars();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
                <Link to='/' className="flex items-center text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="h-5 w-5 mr-1" />
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to='/wishlist' className="p-2 rounded-full hover:bg-gray-100 relative cursor-pointer">
                        <Heart className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cars.length}
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 xl:px-50 py-8 text-sm sm:text-base">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Image Gallery */}
                    <div className="relative h-96 w-full">
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                            <div className="flex items-center">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-medium">{car.rating || '4.8'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Car Details */}
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <div className="flex items-center mb-2">
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {car.brand}
                                    </span>
                                    <span className="ml-3 text-sm text-gray-500">{car.year}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
                                <p className="text-gray-600 mb-4">{car.description}</p>

                                {/* Specifications */}
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="flex items-center">
                                        <Fuel className="h-5 w-5 text-gray-500 mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-500">Fuel Type</p>
                                            <p className="font-medium">{car.fuelType}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-gray-500 mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-500">Seating</p>
                                            <p className="font-medium">{car.seatingCapacity} seats</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-500">Safety</p>
                                            <p className="font-medium">5-Star</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-500">Transmission</p>
                                            <p className="font-medium">{car.transmission || 'Automatic'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price and Action */}
                            <div className="bg-gray-50 rounded-lg p-6 w-full md:w-80">
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Starting at</p>
                                    <p className="text-3xl font-bold text-gray-900">${car.price.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500 mt-1">+ taxes and fees</p>
                                </div>

                                <button
                                    onClick={() => addCar(car)}
                                    disabled={cars.some((c) => c.id === car.id)}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mb-4
                                            ${cars.some((c) => c.id === car.id)
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer text-white'}`}>
                                    {cars.some((c) => c.id === car.id) ? "Added to Wishlist" : "Add to Wishlist"}
                                </button>

                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800 text-center">
                                        Free cancellation up to 24 hours before pickup
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Car