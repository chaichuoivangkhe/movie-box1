import React, {  useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext.jsx'

const SeatLayout = () => {

  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const { axios, getToken } = useAppContext()
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const navigate = useNavigate();


  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if (data.success) {
        setShow({ movie: data.movie, dateTime: data.dateTime })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return; // already taken
    if (!selectedTime) {
      return toast("Hãy chọn thời gian trước");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("Bạn chỉ được chọn 5 ghế 1 lần");
    }

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]);
  };
  
  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isTaken = occupiedSeats.includes(seatId)
          return (
            <button key={seatId} disabled={isTaken} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border cursor-pointer ${
              isTaken ? "bg-gray-600 border-gray-600 text-white cursor-not-allowed" : "border-blue-900"
            } ${selectedSeats.includes(seatId) && !isTaken ? "bg-blue-800 text-white" : ""}`}>
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );
  useEffect(() => {
    getShow();
  }, [id]);
  return !loading && show && show.dateTime?.[date] ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-blue-950 border border-blue-900 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Chọn thời gian</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date].map((item) => (
            <div key={item.time} onClick={async () => {
              setSelectedTime(item)
              try {
                const { data } = await axios.get(`/api/booking/seats/${item.showId}`)
                if (data.success) setOccupiedSeats(data.occupiedSeats)
              } catch (e) { console.error(e) }
            }} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-blue-800 text-white" : "hover:bg-blue-900"}`}>
              <ClockIcon className="w-4 h-4" />
              <p className='text-sm'>{isoTimeFormat(item.time, true)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className='text-2xl font-semibold mb-4'>Chọn ghế ngồi</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>MÀN HÌNH</p>
        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>
          <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
        <button onClick={async () => {
          if (!selectedTime) return toast('Hãy chọn thời gian');
          if (selectedSeats.length === 0) return toast('Hãy chọn ghế');
          try {
            const { data } = await axios.post('/api/booking/create', {
              showId: selectedTime.showId,
              selectedSeats
            }, {
              headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
              toast.success('Tạo đơn thành công, chuyển tới thanh toán')
              navigate(`/payment/${data.data._id}`)
            } else {
              toast.error(data.message || 'Đặt vé thất bại')
            }
          } catch (e) {
            console.error(e)
            toast.error('Đặt vé thất bại')
          }
        }} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-blue-900 hover:bg-blue-800 transition rounded-full font-medium cursor-pointer active:scale-95'>
          Tiến hành thanh toán
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  )
  
}

export default SeatLayout
