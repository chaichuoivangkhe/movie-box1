import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { useAppContext } from '../context/AppContext.jsx'
const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { axios, image_base_url, getToken } = useAppContext()
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true)
  const [trailerKey, setTrailerKey] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if (data.success) {
        // movie + dateTime từ server
        setShow({
          movie: {
            ...data.movie,
            id: data.movie._id, // để tương thích các component
            poster_path: (image_base_url || '') + data.movie.poster_path,
            backdrop_path: (image_base_url || '') + data.movie.backdrop_path,
          },
          dateTime: data.dateTime
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  const fetchTrailer = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}/trailer`)
      if (data.success) setTrailerKey(data.key)
    } catch (e) { console.error(e) }
  }
  const checkFavorite = async () => {
    try {
      const { data } = await axios.get('/api/user/favorites', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success && Array.isArray(data.movies)) {
        setIsFavorite(Boolean(data.movies.find(m => String(m._id) === String(id))))
      }
    } catch (e) { console.error(e) }
  }
  useEffect(() => {
    setLoading(true)
    getShow();
    fetchTrailer();
    checkFavorite();
  }, [id]);
  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_path} alt={show.movie.title} className='max-md:mx-auto
        rounded-xl h-104 max-w-70 object-center' />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />
          <p className='text-gray-30'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-blue-900 fill-blue-900' />
            {show.movie.vote_average.toFixed(1)} Đánh giá của khán giả
          </div>
          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
          <p>
            {timeFormat(show.movie.runtime)} . {show.movie.genres.map(genre => genre.name).join(", ")} . {show.movie.release_date.split("-")[0]}
          </p>
          <div className='flex items-center gap-3 mt-4 flex-nowrap overflow-x-auto no-scrollbar whitespace-nowrap'>
            <button onClick={async () => {
              try {
                await axios.post('/api/user/update-favorite', { movieId: id }, {
                  headers: { Authorization: `Bearer ${await getToken()}` }
                })
                setIsFavorite(v => !v)
              } catch (e) { console.error(e) }
            }} className='bg-gray-700 p-2.5 rounded-full transion cursor-pointer active:scale-95'>
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : ''}`} />
            </button>
            <button onClick={() => setShowTrailer((v) => !v)} className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900
            transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5' />
              {showTrailer ? 'Ẩn Trailer' : 'Xem Trailer'}
            </button>
            <a href="#dateSelect" className='px-10 py-3 text-sm bg-blue-900 hover:bg-blue-900-dull
            transition rounded-md font-medium cursor-pointer active:scale-95'>Mua vé</a>
          </div>
        </div>
      </div>

      <p className='text-lg font-medium mt-32'>Diễn viên yêu thích của bạn</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4 '>
        <div className='flex items-center gap-4 w-max px-4'>
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <img src={(image_base_url || '') + cast.profile_path} alt={cast.name} className='rounded-full h-20 md:h-20 aspect-square object-cover' />
              <p className='font-medium text-xs mt-3'>{cast.name}</p>
            </div>

          ))}
        </div>
      </div>
      <DateSelect dateTime={show.dateTime} id={id} />
      {showTrailer && trailerKey && (
        <div className='mt-10 flex justify-center'>
          <div className='aspect-video w-full max-w-4xl mx-auto'>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title='Trailer'
              className='w-full h-full rounded'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </div>
        </div>
      )}
      
      <div className='flex justify-center mt-20 mb-32'>
        <button onClick={() => { (navigate(`/movies`), scrollTo(0, 0)) }} className='px-10 py-3 text-sm bg-blue-900 hover:bg-blue-900-dull
        transition rounded-md font-medium cursor-pointer active:scale-95'>
          Xem thêm
        </button>
      </div>
    </div>
  ) : <Loading />
}

export default MovieDetail
