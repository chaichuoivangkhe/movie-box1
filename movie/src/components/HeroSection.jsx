import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("backgroundImage.png")] bg-cover bg-center h-screen'>
            <img src={assets.disneyLogo} alt="" className="max-h-25 lg:h-30 mt-20" />
            <h1 className='text-5xl md:text-[100px] md:leading-18 font-semibold max-w-200 drop-shadow-sm'>Lilo & Stitch</h1>
            <div className='flex items-center gap-4 text-white-300'>
                <span className='md:text-lg'>Action | Adventure | Comedy</span>
                <div className='flex items-center gap-1 md:text-lg'>
                    <CalendarIcon className='w-4.5 h-4.5' /> 2026
                </div>
                <div className='flex items-center gap-1 md:text-lg'>
                    <ClockIcon className='w-4.5 h-4.5' /> 1h 48m
                </div>

            </div>
            <p className="text-lg md:text-lg text-white-300">
                The wildly funny and touching story of a lonely Hawaiian girl <br />
                and the fugitive alien who helps to mend her broken family.
            </p>
            <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-2 text-lg bg-blue-900 hover:bg-blue-900-dull transition rounded-full font-medium cursor-pointer'>
                Đặt vé ngay
                <ArrowRight className='w-4 h-4' />
            </button>
        </div>
    )
}

export default HeroSection