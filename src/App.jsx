import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Buses from './Buses'
import Seats from './Seats'
import Booking from './Booking'
import Confirmation from './Confirmation'
import MyBooking from './Mybooking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/buses" element={<Buses/>}/>
        <Route path='/seats' element={<Seats/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
        <Route path='/mybookings' element={<MyBooking/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
