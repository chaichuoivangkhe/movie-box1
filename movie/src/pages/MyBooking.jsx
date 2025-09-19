import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const MyBooking = () => {

  const currency = import.meta.env.VITE_CURRENT || 'VND'
  const { axios, getToken, image_base_url } = useAppContext()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) setBookings(data.bookings)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMyBookings()
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 pb-30 md:pb-50 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

      {bookings.map((item, index) => (
        <div key={index} className='flex flex-col md:flex-row justify-between bg-blue-900/20 border border-blue-900/20 rounded-lg mt-4 p-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
            <img src={(image_base_url || '') + item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3 whitespace-nowrap'>{item.amount}{currency}</p>
              <span className={`inline-flex items-center justify-center px-3 py-1 mb-3 text-xs rounded-full whitespace-nowrap min-w-[110px] ${item.isPaid ? 'bg-green-700 text-white' : 'bg-gray-700 text-white'}`}>
                {item.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </span>
            </div>
            <div className='text-sm'>
              <p><span className='text-gray-400'>Tổng số vé:</span> {item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Số ghế:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  ) : (
    <Loading />
  )
}

export default MyBooking
