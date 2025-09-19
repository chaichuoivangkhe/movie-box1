import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { useAppContext } from '../context/AppContext.jsx'

const FeaturedSection = () => {
    const navigate = useNavigate();
    const { axios, image_base_url } = useAppContext()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get('/api/show/current-movies')
                if (data.success) setMovies(data.movies.map(m => ({
                    id: m._id,
                    title: m.title,
                    backdrop_path: (image_base_url || '') + m.backdrop_path,
                    release_date: m.release_date,
                    genres: m.genres || [],
                    runtime: m.runtime,
                    vote_average: m.vote_average
                })))
            } catch (e) { console.error(e) }
        }
        fetchMovies()
    }, [])

    // Chia phim thành các hàng, mỗi hàng 4 phim
    const moviesChunks = [];
    for (let i = 0; i < movies.length; i += 4) {
        moviesChunks.push(movies.slice(i, i + 4));
    }

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' left='90%' />
                <p className='text-gray-300 font-medium text-lg'>Phim hiện tại</p>
                <button onClick={() => navigate('/movies')} className='group flex items-center gap-2 text-lg text-gray-300 cursor-pointer hover:text-white transition'>
                    Xem tất cả
                    <ArrowRight className='group-hover:translate-x-1 transition w-5 h-5' />
                </button>
            </div>

            {/* Responsive: mobile hiển thị 1 hàng cuộn ngang, tablet 2 hàng, desktop 2 hàng */}
            <div className='hidden md:block'>
                {moviesChunks.slice(0, 2).map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex flex-nowrap gap-6 md:gap-8 mt-8 overflow-x-auto pb-4 no-scrollbar snap-x">
                        {row.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ))}
            </div>
            <div className='md:hidden'>
                <div className="flex flex-nowrap gap-4 mt-6 overflow-x-auto pb-3 no-scrollbar snap-x">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

            <div className='flex justify-center mt-20'>
                <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
                    className='px-10 py-3 text-lg bg-blue-900 hover:bg-blue-900-dull transition rounded-md font-medium cursor-pointer'>
                    Xem thêm
                </button>
            </div>
        </div>
    )
}

export default FeaturedSection
