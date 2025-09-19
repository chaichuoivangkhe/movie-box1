import React, { useState, useEffect, useRef } from 'react'
import BlurCircle from './BlurCircle'
import { useAppContext } from '../context/AppContext.jsx'

const TrailersSection = () => {
    const { axios, image_base_url } = useAppContext()
    const [trailers, setTrailers] = useState([])
    const [currentTrailer, setCurrentTrailer] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const listRef = useRef(null)
    const itemRefs = useRef([])
    const isDownRef = useRef(false)
    const startXRef = useRef(0)
    const scrollLeftRef = useRef(0)
    const movedRef = useRef(false)

    useEffect(() => {
        if (!currentTrailer) return;
        const timer = setTimeout(() => setLoading(false), 300)
        return () => clearTimeout(timer)
    }, [currentTrailer])

    // Hàm chuyển đổi YouTube URL sang embed URL
    const getEmbedUrl = (url) => {
        if (!url) return ''
        // Chuyển URL YouTube thông thường sang dạng embed
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1].split('&')[0]
            return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&showinfo=0`
        }
        return url
    }

    useEffect(() => {
        const fetchAllTrailers = async () => {
            try {
                const { data } = await axios.get('/api/show/current-movies')
                if (!data.success) return;
                const movies = data.movies || []
                const results = await Promise.all(movies.map(async (m) => {
                    try {
                        const r = await axios.get(`/api/show/${m._id}/trailer`)
                        if (r.data?.success && r.data.key) {
                            return {
                                title: m.title,
                                image: (image_base_url || '') + m.backdrop_path,
                                videoUrl: `https://www.youtube.com/watch?v=${r.data.key}`,
                            }
                        }
                    } catch (_) {}
                    return null
                }))
                const valid = results.filter(Boolean)
                setTrailers(valid)
                setCurrentTrailer(valid[0] || null)
                setCurrentIndex(0)
            } catch (e) { console.error(e) }
        }
        fetchAllTrailers()
    }, [])

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            {/* Tạo flex container chứa cả tiêu đề và nút chấm */}
            <div className="flex items-center justify-between mb-4 max-w-[1200px] mx-auto">
                <h2 className='text-white font-semibold text-lg'>Trailers</h2>
            </div>

            <div className='relative mt-6'>
                <BlurCircle top='-50px' right='-100px' />
                <BlurCircle bottom='-100px' left='-100px' />

                {/* Container video không còn chứa nút chấm */}
                <div className="mx-auto max-w-[800px] aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : null}

                    <iframe
                        src={getEmbedUrl(currentTrailer?.videoUrl || '')}
                        width="100%"
                        height="100%"
                        className="mx-auto z-10 relative"
                        allowFullScreen
                        title="Movie trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        onLoad={() => setLoading(false)}
                    ></iframe>
                </div>

                {/* Danh sách trailer ngang với mũi tên điều hướng ở hai đầu */}
                <div className='relative mt-8 max-w-[1200px] mx-auto'>
                  <button
                    onClick={() => {
                      if (!trailers.length) return;
                      const nextIdx = (currentIndex - 1 + trailers.length) % trailers.length;
                      setCurrentIndex(nextIdx);
                      setCurrentTrailer(trailers[nextIdx]);
                      itemRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
                    }}
                    className='hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full z-10'
                    aria-label='Prev'
                  >
                    ◀
                  </button>
                  <div
                    ref={listRef}
                    className='flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 cursor-grab'
                    onMouseDown={(e) => {
                      if (!listRef.current) return
                      isDownRef.current = true
                      movedRef.current = false
                      startXRef.current = e.pageX - listRef.current.offsetLeft
                      scrollLeftRef.current = listRef.current.scrollLeft
                      listRef.current.classList.add('active')
                    }}
                    onMouseLeave={() => {
                      isDownRef.current = false
                    }}
                    onMouseUp={() => {
                      isDownRef.current = false
                    }}
                    onMouseMove={(e) => {
                      if (!isDownRef.current || !listRef.current) return
                      e.preventDefault()
                      const x = e.pageX - listRef.current.offsetLeft
                      const walk = (x - startXRef.current) * 1 // speed factor
                      if (Math.abs(walk) > 5) movedRef.current = true
                      listRef.current.scrollLeft = scrollLeftRef.current - walk
                    }}
                  >
                    {trailers.map((trailer, idx) => (
                      <div
                        key={idx}
                        ref={(el) => (itemRefs.current[idx] = el)}
                        className={`relative cursor-pointer min-w-[220px] md:min-w-[280px] h-[140px] md:h-[160px] rounded-lg overflow-hidden border transition duration-200 ${currentIndex === idx ? 'border-blue-700' : 'border-transparent'}`}
                        onClick={() => { if (movedRef.current) return; setCurrentTrailer(trailer); setCurrentIndex(idx); }}
                      >
                        <img
                          src={trailer.image}
                          alt="trailer"
                          className={`w-full h-full object-cover brightness-75 transition ${currentIndex === idx ? '' : 'grayscale opacity-60'} hover:grayscale-0 hover:opacity-100`}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute top-1/2 left-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 text-white"
                        >
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (!trailers.length) return;
                      const nextIdx = (currentIndex + 1) % trailers.length;
                      setCurrentIndex(nextIdx);
                      setCurrentTrailer(trailers[nextIdx]);
                      itemRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
                    }}
                    className='hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full z-10'
                    aria-label='Next'
                  >
                    ▶
                  </button>
                </div>
            </div>
        </div>
    )
}

export default TrailersSection
