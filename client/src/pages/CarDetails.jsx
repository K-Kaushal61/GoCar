import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets.js'
import Loader from '../components/Loader.jsx'
import { useAppContext } from '../context/AppContext.jsx';
import toast from "react-hot-toast";


const CarDetails = () => {

  const { cars, axios, currency, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()
  const {id} = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate, 
        returnDate
      })
      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 x1:px-32 mt-16'>
        <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'> 
          <img src={assets.arrow_icon} alt="back" className='rotate-180 opacity-65'/>
          Back to Cars
          </button>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
            {/* Left: Car Image & Details */}
            <div className='lg:col-span-2'>
              <img src={car.image} alt={car.name} className='w-full h-auto object-cover rounded-xl md:max-h-100 mb-6 shadow-md'/>
              <div className='space-y-6'>
                <div>
                  <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
                  <p className='text-gray-500 text-lg'>{car.category} - {car.year}</p>
                </div>
                <hr className='border-borderColor my-6'/>

                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                  {[
                  {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                  {icon: assets.fuel_icon, text: car.fuel_type},
                  {icon: assets.carIcon, text: car.transmission},
                  {icon: assets.location_icon, text: car.location},
                  ].map(({icon, text})=> (
                    <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                      <img src={icon} alt={text} className='h-5 mb-2'/>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>

                  {/* Description */}
                  <div>
                    <h1 className='text-x1 font-medium mb-3'>Description</h1>
                    <p className='text-gray-500'>{car.description}</p>
                  </div>
                  {/* Features */}
                  <div>
                    <h1 className='text-x1 font-medium mb-3'>Features</h1>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      {
                        ["360 Camera" , "Bluetooth", "GPS", "Heated Seats", "Rear View"].map((item) => (
                          <li key={item} className='flex items-center text-gray-500'>
                            <img src={assets.check_icon} className='h-4 mr-2' />
                            {item}
                          </li>
                        ))
                      }
                    </ul>

                  </div>

              </div>
            </div>
            
            {/* Right: Booking Form */}
            <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
              <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency}{car.pricePerDay} <span className='text-base text-gray-400 font-normal'> /day</span></p> 

              <hr className='border-borderColor my-6'/>

              <div className='flex flex-col gap-2'>
                <label className='block mb-2' htmlFor="pickup-date">Pick-Up Date</label>
                <input value={pickupDate} onChange={(e)=> setPickupDate(e.target.value)} type="date" id="pickup-date" className='w-full p-2 border border-gray-300 rounded-md' required min={new Date().toISOString().split("T")[0]}/>
              </div>
              
              <div className='flex flex-col gap-2'>
                <label className='block mb-2' htmlFor="return-date">Return Date</label>
                <input value={returnDate} onChange={(e)=> setReturnDate(e.target.value)} type="date" id="return-date" className='w-full p-2 border border-gray-300 rounded-md' required min={new Date().toISOString().split("T")[0]}/>
              </div>

              <div className='flex items-center'>
                <input type="checkbox" id="terms" className='mr-2 cursor-pointer' required required/>
                <label htmlFor="terms">I agree to the Terms of Service</label>
              </div>

              <button type="submit" className='w-full bg-primary text-white py-3 rounded-md hover:bg-primaryDark transition duration-300 cursor-pointer'>Book Now</button>


            </form>
          </div>
    </div>
  ) : <Loader />
}

export default CarDetails