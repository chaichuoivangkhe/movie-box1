import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import Loading from '../../components/Loading';
import { useAppContext } from '../../context/AppContext.jsx'

const ListBookings = () => {
    const currency = import.meta.env.VITE_CURRENT
    const { axios, getToken } = useAppContext()

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-bookings', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) setBookings(data.bookings)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    };
    const deleteBooking = async (bookingId) => {
        try {
            if (!confirm('Bạn chắc chắn muốn xóa vé này?')) return;
            const { data } = await axios.delete(`/api/admin/booking/${bookingId}`, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setBookings(prev => prev.filter(b => b._id !== bookingId))
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        getAllBookings();
    }, []);

    return !isLoading ? (
        <>
            <Title text1="Danh Sách " text2="Đặt Vé" />
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-blue-900/40 text-left text-white">
                            <th className="p-2 font-medium pl-5">Tên Người Dùng</th>
                            <th className="p-2 font-medium">Tên Phim</th>
                            <th className="p-2 font-medium">Thời Gian Chiếu</th>
                            <th className="p-2 font-medium">Ghế</th>
                            <th className="p-2 font-medium">Số Tiền</th>
                            <th className="p-2 font-medium text-center w-24">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        {bookings.map((item, index) => (
                            <tr key={index} className="border-b border-blue-900/20 bg-blue-900/10 even:bg-blue-900/5">
                                <td className="p-2 min-w-45 pl-5">{item.user?.name || 'N/A'}</td>
                                <td className="p-2">{item.show?.movie?.title || 'N/A'}</td>
                                <td className="p-2">{item.show?.showDateTime ? dateFormat(item.show.showDateTime) : 'N/A'}</td>
                                <td className="p-2">{Array.isArray(item.bookedSeats) ? item.bookedSeats.join(", ") : 'N/A'}</td>
                                <td className="p-2">{item.amount}{currency}</td>
                                <td className="p-2 text-center align-middle">
                                    <button onClick={() => deleteBooking(item._id)} className='px-3 py-1 text-xs bg-red-700 hover:bg-red-600 rounded'>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    ) : <Loading />
}

export default ListBookings
