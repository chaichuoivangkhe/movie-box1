import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()

  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const inputRef = useRef(null)
  const searchWrapRef = useRef(null)

  // call backend current movies for search suggestions
  useEffect(() => {
    let active = true
    const run = async () => {
      try {
        if (!query.trim()) { setResults([]); return }
        const res = await fetch('/api/show/current-movies')
        const data = await res.json()
        if (!active || !data.success) return
        const list = (data.movies || []).filter(m => (m.title || '').toLowerCase().includes(query.toLowerCase()))
        setResults(list.slice(0, 6))
      } catch (_) {}
    }
    run()
    return () => { active = false }
  }, [query])

  // close when click outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!searchWrapRef.current) return
      if (!searchWrapRef.current.contains(e.target)) {
        setShowSearch(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo1} alt='' className='w-20 h-auto' />
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0
        max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
        min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
        border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ?
          'max-md:w-full' : 'max-md:w-0'}`}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)} />
        <Link onClick={() => { scrollTo(0, 0), setIsOpen(false) }} to='/'>Home</Link>
        <Link onClick={() => { scrollTo(0, 0), setIsOpen(false) }} to='/movies'>Movies</Link>
        <Link onClick={() => { scrollTo(0, 0), setIsOpen(false) }} to='/theaters'>Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0), setIsOpen(false) }} to='/'>Releases</Link>
        <Link onClick={() => { scrollTo(0, 0), setIsOpen(false) }} to='/favorite'>Favorites</Link>
      </div>

      <div ref={searchWrapRef} className='relative flex items-center gap-4'>
        <SearchIcon
          className='max-md:hidden w-6 h-6 cursor-pointer'
          onClick={() => { setShowSearch(v => !v); setTimeout(() => inputRef.current?.focus(), 0) }}
        />
        <div className='relative hidden md:block'>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') { setShowSearch(false); setQuery('') } }}
            placeholder='Tìm phim...'
            className={`rounded-full bg-white/15 outline-none transition-all duration-200 ${showSearch ? 'px-3 py-1.5 w-72 opacity-100 border border-white/20' : 'px-0 py-0 w-0 opacity-0 border border-transparent pointer-events-none'}`}
          />
          {showSearch && query && results.length > 0 && (
            <div className='absolute mt-2 w-full rounded-lg bg-black/80 backdrop-blur border border-white/10 z-50'>
              {results.map(r => (
                <div key={r._id} onClick={() => { navigate(`/movies/${r._id}`); setQuery(''); setShowSearch(false); }} className='px-3 py-2 cursor-pointer hover:bg-white/10'>
                  {r.title}
                </div>
              ))}
            </div>
          )}
        </div>
        {
          !user ? (
            <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-blue-900 hover:bg-blue-900-dull transition rounded-full font-medium cursor-pointer'>Login</button>
          ) : (
            <UserButton >
              <UserButton.MenuItems>
                <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15} />} onClick={() => navigate('/my-bookings')} />
              </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      {/* Mobile menu toggle */}
      <MenuIcon
        className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}

export default Navbar;