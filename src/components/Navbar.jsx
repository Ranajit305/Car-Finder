import { Heart, Menu, X, Car } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CarContext } from '../context/CarContext';
import SearchBox from './SearchBox';

export const Navbar = () => {

    const { cars, isSidebarOpen, setIsSidebarOpen } = useContext(CarContext);

    return (
        <nav className="bg-white shadow-lg h-16 flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center justify-between w-full">

                <div className="md:hidden w-150 flex" >
                    <h1 className='flex text-xl font-bold text-blue-600'>
                        <Car className="mr-2" /> <span>Car Finder</span>
                    </h1>
                </div>

                <SearchBox />

                <div className='flex gap-3'>
                    <button className="p-2 rounded-full hover:bg-gray-100 relative">
                        <Link to='/wishlist'><Heart className="h-6 w-6 text-gray-700" /></Link>
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cars.length}
                        </span>
                    </button>
                    {isSidebarOpen ? (
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 rounded-full hover:bg-gray-100 relative">
                            <X className="h-6 w-6 text-gray-700" />
                        </button>
                    ) : (
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 rounded-full hover:bg-gray-100 relative">
                            <Menu className="h-6 w-6 text-gray-700" />
                        </button>
                    )}
                </div>
            </div>
        </nav >
    );
};