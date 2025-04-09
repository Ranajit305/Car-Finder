import { useContext, useEffect, useMemo, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import cars from '../utils/cars.json'
import Cars from '../components/Cars';
import { CarContext } from '../context/CarContext';

export const Home = () => {

    const { getCars, sortOrder } = useContext(CarContext);

    const [filters, setFilters] = useState({
        brand: [],
        priceRange: 50000,
        fuelType: [],
        seatingCapacity: []
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 10;

    // Filter cars first
    const filteredCars = useMemo(() => {
        let result = [...cars];

        // 1. Filter
        result = result.filter(car => {
            if (filters.brand.length > 0 && !filters.brand.includes(car.brand)) return false;
            if (car.price > filters.priceRange) return false;
            if (filters.fuelType.length > 0 && !filters.fuelType.includes(car.fuelType)) return false;
            if (filters.seatingCapacity.length > 0) {
                const seatMatch = filters.seatingCapacity.some(seats => car.seatingCapacity === parseInt(seats));
                if (!seatMatch) return false;
            }
            return true;
        });

        // 2. Sort
        if (sortOrder === "lowToHigh") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [cars, filters, sortOrder]);

    // Get current cars for the page
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setCurrentPage(1);
    }
    
    useEffect(() => {
        getCars();
    }, [])

    return (
        <div className="md:flex min-h-screen">
            {/* Sidebar - Desktop */}
            <Sidebar filters={filters} setFilters={setFilters} handleFilterChange={handleFilterChange} />

            {/* Sidebar - Mobile */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-20 md:hidden">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileSidebarOpen(false)}
                    ></div>
                    <div className="relative z-30">
                        <Sidebar filters={filters} handleFilterChange={handleFilterChange} />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <Navbar onMenuClick={() => setMobileSidebarOpen(true)}/>
                <Cars filteredCars={filteredCars} indexOfFirstCar={indexOfFirstCar} indexOfLastCar={indexOfLastCar} currentCars={currentCars} currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
            </div>
        </div>
    );
};