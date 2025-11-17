import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CarDetails from './pages/CarDetails.jsx'
import Cars from './pages/Cars.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Footer from './components/Footer.jsx'
import Layout from './pages/owner/Layout.jsx'
import Dashboard from './pages/owner/Dashboard.jsx'
import AddCar from './pages/owner/AddCar.jsx'
import ManageBookings from './pages/owner/ManageBookings'
import ManageCars from './pages/owner/ManageCars'

// ✅ Import Login component
import Login from './components/Login'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");  // <-- NEW

  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/car-details/:id' element={<CarDetails />}/>
        <Route path='/cars' element={<Cars />}/>
        <Route path='/my-bookings' element={<MyBookings />}/>
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='add-car' element={<AddCar />}/>
          <Route path='manage-cars' element={<ManageCars />}/>
          <Route path='manage-bookings' element={<ManageBookings />}/>
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}

      {/* ⚡ LOGIN MODAL (visible when showLogin = true) */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Login 
            title="User Login"
            linkTo="/signup"
            mode={authMode}               
            setMode={setAuthMode}
            onClose={() => setShowLogin(false)}
            onSubmit={(email, pass) => {
              console.log("Login:", email, pass)
              setShowLogin(false)
            }}
          />
        </div>
      )}
    </>
  )
}

export default App
