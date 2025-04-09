import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Wishlist from './pages/Wishlist'
import Car from './pages/Car'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/car/:name' element={<Car />} />
      </Routes>
    </div>
  )
}

export default App