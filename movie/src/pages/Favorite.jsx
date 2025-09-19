import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext.jsx'

const Favorite = () => {
  const { axios, getToken, image_base_url } = useAppContext()
  const [movies, setMovies] = useState([])

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('/api/user/favorites', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) setMovies(data.movies.map(m => ({
        id: m._id,
        title: m.title,
        backdrop_path: (image_base_url || '') + m.backdrop_path,
        release_date: m.release_date,
        genres: m.genres || [],
        runtime: m.runtime,
        vote_average: m.vote_average,
      })))
    } catch (e) { console.error(e) }
  }

  useEffect(() => { fetchFavorites() }, [])

  return movies.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44
    overflow-hidden min-h-[80vh]'>
      <BlurCircle top='100px' left='1px' />
      <BlurCircle bottom='100px' right='50px' />
      <h1 className='text-xl font-medium my-4'>Phim yêu thích của bạn</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  ) : (
    <div>No movies found</div>
  )
}

export default Favorite
