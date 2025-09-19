import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import BlurCircle from './BlurCircle';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const onBookHandle = () => {
        if (!selected) {
            return toast('Vui lòng chọn ngày trước khi đặt vé', {
                icon: '⚠️',
            })
        }
        navigate(`/movies/${id}/${selected}`);
        scrollTo(0, 0);
    }
    return (
        <div id='dateSelect' className='pt-30'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-blue-950/70 border border-blue-900/40 rounded-lg'>
                <BlurCircle top="-100px" left="-100px" />
                <BlurCircle top="100px" right="0px" />
                <div>
                    <p className='text-lg font-semibold'>Chọn ngày</p>
                    <div className='flex items-center gap-6 text-sm mt-5'>
                        <ChevronLeftIcon width={28} />
                        <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                            {Object.keys(dateTime).map((date) => (
                                <button key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? 'bg-blue-900 text-white' : 'border border-blue-500'} hover:bg-blue-800 transition-all`} onClick={() => setSelected(date)}>
                                    <span>{new Date(date).getDate()}</span>
                                    <span>{new Date(date).toLocaleDateString("vi-VN", { month: "short" })}</span>
                                </button>
                            ))}
                        </span>
                        <ChevronRightIcon width={28} />
                    </div>
                </div>
                <button onClick={onBookHandle} className='bg-blue-900 text-white px-8 py-2 mt-6 rounded hover:bg-blue-800 transition-all cursor-pointer'>
                    Đặt vé ngay
                </button>
            </div>
        </div>
    )
}

export default DateSelect
