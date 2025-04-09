import { createContext, useState } from "react"

export const CarContext = createContext();

export const CarContextProvider = (props) => {

    const [cars, setCars] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("");

    const getCars = () => {
        try {
            setCars(JSON.parse(localStorage.getItem('cars')) || []);
        } catch (error) {
            console.log(error.message);
        }
    }

    const addCar = (car) => {
        try {
            const storedCars = JSON.parse(localStorage.getItem('cars')) || [];
            const updatedCars = [...storedCars, car];
            localStorage.setItem('cars', JSON.stringify(updatedCars));
            setCars(updatedCars);
        } catch (error) {
            console.log(error.message);
        }
    }

    const removeCar = (carId) => {
        try {
            const storedCars = JSON.parse(localStorage.getItem('cars')) || [];
            const updatedCars = storedCars.filter((car) => car.id !== carId);
            localStorage.setItem('cars', JSON.stringify(updatedCars));
            setCars(updatedCars);
        } catch (error) {
            console.log("Error removing car:", error.message);
        }
    };

    const value = {
        cars, setCars,
        addCar, removeCar, getCars,
        isSidebarOpen, setIsSidebarOpen,
        sortOrder, setSortOrder
    }

    return (
        <CarContext.Provider value={value}>
            {props.children}
        </CarContext.Provider>
    )
}