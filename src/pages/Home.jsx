import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Book, ChevronDown, ChevronUp } from 'lucide-react'
import { DEF_TIME, MAX_MINUTES, MAX_SECONDS } from '../assets/timeConfig'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    const timerPage = () => {
        navigate("/timer", { state: { minutes, seconds } })
    }

    const collectionPage = () => {
        navigate("/collection")
    }

    const [minutes, setMinutes] = useState(() => {
        return parseInt(localStorage.getItem('minutes')) || 0
    });

    const [seconds, setSeconds] = useState(() => {
        return parseInt(localStorage.getItem('seconds')) || 0
    });

    useEffect(() => {
        localStorage.setItem('minutes', minutes)
        localStorage.setItem('seconds', seconds)
    }, [minutes, seconds])

    const increaseMinutes = () => {
        setMinutes(prev => prev + 1);
        minutes >= MAX_MINUTES ? setMinutes(0) : minutes;
    }

    const increaseSeconds = () => {
        setSeconds(prev => prev + 1);
        seconds >= MAX_SECONDS ? setSeconds(0) : seconds;
    }

    const decreaseMinutes = () => {
        setMinutes(prev => prev - 1);
        minutes <= 0 ? setMinutes(MAX_MINUTES) : minutes;
    }

    const decreaseSeconds = () => {
        setSeconds(prev => prev - 1);
        seconds <= 0 ? setSeconds(MAX_SECONDS) : seconds;
    }

    return (
        <div className='w-full h-screen bg-lightpink flex justify-center items-center'>
            <div className='bg-gradient-to-b from-pink via-lightpink to-pink w-[450px] h-[600px] border-4 border-purple rounded-xl p-8'>
                <div className='w-full h-full flex flex-col justify-between bg-yellow rounded-lg'>
                    <div className='bg-lightpink border-4 border-purple rounded-t-lg px-8 py-4'>
                        <p className='text-5xl text-center text-purple font-bold'>Focuscrack</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-[220px] h-[220px] overflow-hidden flex justify-center items-center'>
                            <img className='w-[300px] h-[300px] object-cover' src={assets.egg_home} />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='bg-lightpink border-4 border-purple rounded-b-lg px-8 py-4'>
                        <div className='flex justify-center items-end mb-4 gap-4'>
                            <div className='flex flex-col justify-center items-center gap-4'>
                                <ChevronUp className='text-purple cursor-pointer' strokeWidth={4} onClick={increaseMinutes} />
                                <ChevronDown className='text-purple cursor-pointer' strokeWidth={4} onClick={decreaseMinutes} />
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='text-2xl font-bold text-purple'>min</p>
                                <input type="text" readOnly 
                                value={String(minutes).padStart(2, '0')} 
                                onChange={(e) => setMinutes(parseInt(e.target.value))}
                                className='w-full bg-yellow text-purple text-4xl font-bold text-center border-4 border-purple rounded-lg p-2 focus:outline-none' />
                            </div>
                            <div className='relative'>
                                <p className='absolute bottom-[14px] left-[-20px] text-4xl text-center text-purple font-bold mx-4'>:</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='text-2xl font-bold text-purple'>sec</p>
                                <input type="text" readOnly 
                                value={String(seconds).padStart(2, '0')} 
                                onChange={(e) => setSeconds(parseInt(e.target.value))}
                                className='w-full bg-yellow text-purple text-4xl font-bold text-center border-4 border-purple rounded-lg p-2 focus:outline-none' />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4'>
                                <ChevronUp className='text-purple cursor-pointer' strokeWidth={4} onClick={increaseSeconds} />
                                <ChevronDown className='text-purple cursor-pointer' strokeWidth={4} onClick={decreaseSeconds} />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {minutes === 0 && seconds === 0 ? <button className='bg-pink text-4xl text-center text-purple font-bold border-4 border-purple rounded-lg px-4 py-2 mx-4 cursor-pointer'>Start</button> : <button onClick={timerPage} className='bg-pink text-4xl text-center text-yellow font-bold border-4 border-purple rounded-lg px-4 py-2 mx-4 cursor-pointer'>Start</button>}
                        </div>

                        {/* collection button */}
                        <div className='relative'>
                            <button onClick={collectionPage} className='absolute bottom-0 right-[-16px] bg-yellow border-4 border-purple rounded-full cursor-pointer'>
                                <div className='w-[60px] h-[60px] flex justify-center items-center'>
                                    <Book className='size-9 text-pink' strokeWidth={3} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home