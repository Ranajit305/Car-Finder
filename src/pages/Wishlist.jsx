import React, { useContext, useEffect } from 'react';
import { CarContext } from '../context/CarContext';
import { ShoppingCart, Fuel, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {

  const { cars, removeCar, getCars } = useContext(CarContext);

  useEffect(() => {
    getCars();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-1" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="h-8 w-8 mr-2 text-blue-600" />
            Your Wishlist
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Wishlist Content */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{car.name}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {car.brand}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <span className="flex items-center mr-3">
                      <Fuel className="h-4 w-4 mr-1 text-gray-500" /> {car.fuelType}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-500" /> {car.seatingCapacity} seats
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      ${car.price.toLocaleString()}
                    </span>
                    <button onClick={() => removeCar(car.id)} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Remove Car
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Start adding cars to your wishlist to see them here</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;