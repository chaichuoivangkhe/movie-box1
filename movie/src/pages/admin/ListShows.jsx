import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext.jsx'

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENT
  const { axios, getToken } = useAppContext()
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllShows = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-shows', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) setShows(data.shows)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }
  const deleteShow = async (showId) => {
    try {
      if (!confirm('Bạn chắc chắn muốn xóa lịch chiếu này?')) return;
      const { data } = await axios.delete(`/api/admin/show/${showId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) setShows(prev => prev.filter(s => s._id !== showId))
    } catch (e) { console.error(e) }
  }
  useEffect(() => {
    getAllShows();
  }, []);
  return !loading ? (
    <>
      <Title text1="Danh Sách " text2="Phim" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-blue-900/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Tên Phim</th>
              <th className="p-2 font-medium">Thời Gian Chiếu</th>
              <th className="p-2 font-medium">Tổng Vé Đã Đặt</th>
              <th className="p-2 font-medium">Doanh Thu</th>
              <th className="p-2 font-medium text-center w-24">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr key={index} className="border-b border-blue-900/20 bg-blue-900/10 even:bg-blue-900/20">
                <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                <td className="p-2"> {Object.keys(show.occupiedSeats).length * show.showPrice} {currency}</td>
                <td className="p-2 text-center align-middle"><button onClick={() => deleteShow(show._id)} className='px-3 py-1 text-xs bg-red-700 hover:bg-red-600 rounded'>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  ) : (
    <Loading />
  );
}

export default ListShows
