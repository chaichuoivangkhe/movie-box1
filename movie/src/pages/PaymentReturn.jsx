import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'

const PaymentReturn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getToken, axios } = useAppContext()
  const [message, setMessage] = useState('Đang xác nhận thanh toán...')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const resultCode = params.get('resultCode')
    const extraData = params.get('extraData') // bookingId đã gửi ở extraData

    const confirm = async () => {
      try {
        if (resultCode === '0' && extraData) {
          await axios.post('/api/booking/confirm', { bookingId: extraData }, {
            headers: { Authorization: `Bearer ${await getToken()}` }
          })
          setMessage('Đã thanh toán thành công')
        } else {
          setMessage('Thanh toán chưa thành công')
        }
      } catch (_) {
        setMessage('Xác nhận thất bại')
      } finally {
        setTimeout(() => navigate('/my-bookings'), 1200)
      }
    }
    confirm()
  }, [location.search])

  return (
    <div className='px-6 md:px-16 lg:px-40 pt-20 md:pt-50 pb-20 md:pb-50 min-h-[70vh] flex items-center justify-center'>
      <p className='font-semibold'>{message}</p>
    </div>
  )
}

export default PaymentReturn
