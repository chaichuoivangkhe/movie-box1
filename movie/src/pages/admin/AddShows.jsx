import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
// 1. THÊM ICON PLUS VÀ MINUS
import { CheckIcon, StarIcon, XIcon, PlusIcon, MinusIcon } from 'lucide-react'
import { kConverter } from '../../lib/kConverter'
import Loading from '../../components/Loading'
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'


const AddShows = () => {

  const { axios, getToken, user, image_base_url } = useAppContext()
  const currency = import.meta.env.VITE_CURRENT
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeSelection, setDateTimeSelection] = useState({})
  const [dateTimeInput, setDateTimeInput] = useState("")
  const [showPrice, setShowPrice] = useState("")
  const [addingShow, setAddingShow] = useState(false)
  const [existingShows, setExistingShows] = useState([])
  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get('/api/show/now-playing', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setNowPlayingMovies(data.movies)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }
  const fetchExistingShows = async (movieId) => {
    try {
      const { data } = await axios.get(`/api/show/${movieId}`)
      if (data.success) {
        // Chuyển về mảng show để tiện thao tác xóa từng suất
        const result = []
        Object.entries(data.dateTime).forEach(([date, arr]) => {
          arr.forEach(item => {
            result.push({ date, time: new Date(item.time).toISOString().slice(11,16), showId: item.showId })
          })
        })
        setExistingShows(result)
      }
    } catch (e) { console.error(e) }
  }
  // 2. TẠO HÀM XỬ LÝ TĂNG/GIẢM GIÁ
  const priceStep = 5000; // Định nghĩa bước nhảy giá tiền

  const handleIncreasePrice = () => {
    // Dùng updater function để đảm bảo giá trị luôn mới nhất
    setShowPrice(prevPrice => {
      // Lấy giá hiện tại, chuyển sang SỐ. Nếu rỗng hoặc không hợp lệ thì coi như là 0.
      const currentPrice = Number(prevPrice) || 0;
      // Cộng thêm 5000 và chuyển lại thành CHUỖI để set vào state
      return String(currentPrice + priceStep);
    });
  };

  const handleDecreasePrice = () => {
    setShowPrice(prevPrice => {
      const currentPrice = Number(prevPrice) || 0;
      const newPrice = currentPrice - priceStep;
      // Không cho phép giá trị âm, nếu nhỏ hơn 0 thì trả về 0
      return String(newPrice < 0 ? 0 : newPrice);
    });
  };


  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;
    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        const newTimes = [...times, time].sort();
        return { ...prev, [date]: newTimes };
      }
      return prev;
    });
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validate inputs before showing loading state
    if (!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    setAddingShow(true)
    try {

      const showsInput = Object.entries(dateTimeSelection).map(([date, times]) => {
        // 'times' ở đây đã là một mảng các suất chiếu cho ngày 'date'
        return { date: date, time: times };
      });

      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice)
      }
      console.log("Dữ liệu gửi lên server:", payload);
      const { data } = await axios.post('/api/show/add', payload, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        setSelectedMovie(null)
        setDateTimeSelection({})
        setShowPrice("")
      }
    } catch (error) {
      console.error("Error adding show:", error)
      toast.error("Failed to add show, hãy thử lại")
    } finally {
      setAddingShow(false)
    }
  }


  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies();
    }

  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Thêm " text2="Lịch Chiếu" />
      <form onSubmit={handleSubmit}>
        <p className='mt-10 text-lg font-medium'>1. Chọn phim đang chiếu</p>
        <div className='overflow-x-auto pb-4'>
          <div className='group flex flex-wrap gap-4 mt-4 w-max'>
            {nowPlayingMovies.map((movie) => (
              <div key={movie.id} className={'relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300'}
                onClick={() => { setSelectedMovie(movie.id); fetchExistingShows(movie.id) }}>
                {/* ... image and movie info ... */}
                <div className="relative rounded-lg overflow-hidden">
                  <img src={image_base_url + movie.poster_path} alt={movie.title} className="w-full object-cover brightness-90" />
                  <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                    <p className="flex items-center gap-1 text-gray-400">
                      <StarIcon className="w-4 h-4 text-blue-900 fill-blue-900" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
                  </div>
                </div>
                {selectedMovie === movie.id && (
                  <div className='absolute top-2 right-2 flex items-center justify-center bg-blue-900 h-6 w-6 rounded'>
                    <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5} />
                  </div>
                )}
                <p className='font-medium truncate'>{movie.title}</p>
                <p className='text-gray-400 text-sm'>{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CẬP NHẬT JSX CHO Ô NHẬP GIÁ */}
        <div className="mt-8">
          <label className="block text-lg font-medium mb-2">2. Giá vé</label>
          <div className="inline-flex items-center gap-3 border border-gray-600 p-1 rounded-md">
            <p className="text-gray-400 text-sm pl-2">{currency}</p>
            <input
              min={0}
              type="number"
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder="Nhập giá vé"
              className="outline-none bg-transparent w-28 text-center"
              step={priceStep} // Thêm step để có thể dùng mũi tên lên/xuống của trình duyệt
            />
            <div className='flex items-center gap-1'>
              <button
                type="button"
                onClick={handleDecreasePrice}
                className='p-1 rounded-md hover:bg-gray-700'
              >
                <MinusIcon className='w-4 h-4 text-white' />
              </button>
              <button
                type="button"
                onClick={handleIncreasePrice}
                className='p-1 rounded-md hover:bg-gray-700'
              >
                <PlusIcon className='w-4 h-4 text-white' />
              </button>
            </div>
          </div>
        </div>

        {/* ... Các phần còn lại của form (Date & Time Selection, ...) ... */}
        <div className="mt-6">
          <label className="block text-lg font-medium mb-2">3. Chọn ngày và giờ</label>
          <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
            <input type="datetime-local" value={dateTimeInput} onChange={
              (e) => setDateTimeInput(e.target.value)}
              className="outline-none rounded-md bg-transparent" />
            <button type="button" onClick={handleDateTimeAdd} className="bg-blue-900/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-900 cursor-pointer">
              Thêm suất chiếu
            </button>
          </div>
        </div>

        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="mt-6">
            <p className="font-medium mb-2">Các suất chiếu đã chọn:</p>
            <div className="flex flex-col gap-3">
              {Object.entries(dateTimeSelection).map(([date, times]) => (
                <div key={date}>
                  <p className="font-semibold text-gray-300">{date}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {times.map((time) => (
                      <div key={time} className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-sm">
                        <span>{time}</span>
                        <button type="button" onClick={() => handleRemoveTime(date, time)}>
                          <XIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='mt-10'>
          <button onClick={handleSubmit} disabled={addingShow} type="submit" className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            Thêm Lịch Chiếu
          </button>
        </div>

        {selectedMovie && existingShows.length > 0 && (
          <div className='mt-10'>
            <p className='text-lg font-medium'>4. Lịch đã thêm</p>
            <div className='flex flex-col gap-2 mt-2'>
              {existingShows.map((s) => (
                <div key={s.showId} className='flex items-center gap-3 bg-gray-800 rounded px-3 py-2 w-max'>
                  <span>{s.date}</span>
                  <span>{s.time}</span>
                  <button type='button' onClick={async () => {
                    try {
                      const ok = confirm('Xóa suất chiếu này?')
                      if (!ok) return
                      const { data } = await axios.delete(`/api/admin/show/${s.showId}`, {
                        headers: { Authorization: `Bearer ${await getToken()}` }
                      })
                      if (data.success) setExistingShows(prev => prev.filter(x => x.showId !== s.showId))
                    } catch (e) { console.error(e) }
                  }} className='p-1 rounded hover:bg-gray-700'>
                    <XIcon className='w-4 h-4 text-red-400' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </>
  ) : <Loading />
}

export default AddShows