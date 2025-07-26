import React, { useEffect, useState } from 'react'
import { assets, eggs } from '../assets/assets'
import { Pause, Play, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Timer = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const minutes = location.state?.minutes;
    const seconds = location.state?.seconds;
    const totalSeconds = (minutes * 60) + seconds;
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const [isCount, setIsCount] = useState(true);
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {

        if (timeLeft < 0) {
            navigate("/gotcha");
            return;
        }

        if (!isCount) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer);

    }, [isCount, timeLeft])

    const toggleCount = () => {
        setIsCount(!isCount)
    }

    const backPage = () => {
        navigate("/")
    }

    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;

    const percentTime = ((totalSeconds - timeLeft) / totalSeconds) * 100;

    const currentEgg = eggs.find(egg => percentTime >= egg.min_percent && percentTime <= egg.max_percent)

    return (
        <div className='w-full h-screen bg-lightpink flex justify-center items-center'>
            <div className='bg-gradient-to-b from-pink via-lightpink to-pink w-[450px] h-[600px] border-4 border-purple rounded-xl p-8'>
                <div className='w-full h-full flex flex-col justify-between bg-yellow rounded-lg'>
                    <div className='bg-lightpink border-4 border-purple rounded-t-lg px-8 py-4'>
                        <p className='text-5xl text-center text-purple font-bold'>{String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-[220px] h-[220px] overflow-hidden flex justify-center items-center'>
                            {
                                currentEgg && (<img className='w-[300px] h-[300px] object-cover' src={currentEgg.image} />)
                            }
                        </div>
                    </div>
                    <div className='bg-lightpink border-4 border-purple rounded-b-lg px-8 py-4'>
                        <div className='flex justify-center gap-4'>
                            <button onClick={backPage} className='w-[80px] h-[80px] flex justify-center items-center bg-pink border-4 border-purple rounded-full cursor-pointer'>
                                <X className='size-12 text-yellow' />
                            </button>
                            <button onClick={toggleCount} className='w-[80px] h-[80px] bg-pink border-4 border-purple rounded-full cursor-pointer'>
                                <div className='flex justify-center items-center'>
                                    {
                                        isCount ? <Pause className='size-12 text-purple fill-yellow' /> : <Play className='size-12 text-purple fill-yellow' />
                                    }
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer