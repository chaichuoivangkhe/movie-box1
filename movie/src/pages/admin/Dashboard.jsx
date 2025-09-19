import { ChartLineIcon, CircleDollarSignIcon, PlaySquareIcon, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext.jsx'

const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENT
  const { axios, getToken, image_base_url } = useAppContext()

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);
  const dashboardCards = [
    { title: "Tổng vé", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: "Tổng doanh thu", value: dashboardData.totalRevenue + currency || "0", icon: CircleDollarSignIcon },
    { title: "Phim đang chiếu", value: dashboardData.activeShows.length || "0", icon: PlaySquareIcon },
    { title: "Tổng người dùng", value: dashboardData.totalUser || "0", icon: UsersIcon }
  ];
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setDashboardData(data.dashboardData)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return !loading ? (
    <>
      <Title text1="Admin " text2="Dashboard" />
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-3 bg-blue-900/10 border border-blue-900/20 rounded-md max-w-50 w-full">
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-10 text-lg font-medium">Phim đang chiếu</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="10px" left="-10%" />
        {dashboardData.activeShows.map((show) => (
          <div key={show._id} className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-blue-900/20 border border-blue-900/40 hover:-translate-y-1 transition duration-300">
            <img src={(image_base_url || '') + show.movie.poster_path} alt='' className="h-60 w-full object-cover" />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">{show.showPrice} {currency} </p>
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-blue-900 fill-blue-900" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.movie.release_date)}</p>
          </div>
        ))}
      </div>
    </>
  ) : <Loading />;
}

export default Dashboard
