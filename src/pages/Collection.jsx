import React, { useEffect, useState } from 'react'
import { assets, monsters } from '../assets/assets'
import { Book, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Reset from '../components/Reset'

const Collection = () => {

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [countMonster, setCountMonster] = useState({});
    const [showReset, setShowReset] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('countMonster')
        if (stored) {
            setCountMonster(JSON.parse(stored))
        }
    }, [])

    const currentMonster = monsters[currentIndex]
    const isCollected = countMonster?.[currentMonster.name] > 0

    const handleBack = () => {
        setCurrentIndex((prev) => (prev - 1 + monsters.length) % monsters.length)
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % monsters.length)
    }

    const handleReset = () => {
        const update = {
            ...countMonster,
            [currentMonster.name]: 0
        }
        setCountMonster(update)
        localStorage.setItem('countMonster', JSON.stringify(update))
        setShowReset(false)
    }

    const homePage = () => {
        navigate("/")
    }

    return (
        <div className='w-full h-screen bg-lightpink flex justify-center items-center relative'>
            {/* reset */}
            {showReset && isCollected && (
                <div className='absolute top-[265px] z-50 flex justify-center items-center'>
                    <Reset onConfirm={handleReset} onCancel={() => setShowReset(false)} />
                </div>
            )}
            <div className='bg-gradient-to-b from-pink via-lightpink to-pink w-[450px] h-[600px] border-4 border-purple rounded-xl p-8'>
                <div className='w-full h-full flex flex-col justify-between bg-yellow rounded-lg'>
                    <div className='relative'>
                        {isCollected && (
                            <button onClick={() => setShowReset(true)} className='absolute right-[16px] top-[100px] bg-yellow border-4 border-purple rounded-full cursor-pointer'>
                                <div className='w-[60px] h-[60px] flex justify-center items-center'>
                                    <RotateCcw className='size-9 text-pink' strokeWidth={3} />
                                </div>
                            </button>
                        )}
                    </div>
                    <div className='bg-lightpink border-4 border-purple rounded-t-lg px-8 py-4'>
                        <p className='text-5xl text-center text-purple font-bold'>Collection</p>
                    </div>
                    <div className='h-full flex flex-col justify-evenly items-center'>
                        {/* reset button */}
                        <div className='flex'>
                            <p className='text-2xl font-bold text-purple'>{currentIndex + 1}/{monsters.length}</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <ChevronLeft onClick={handleBack} className='size-12 text-purple cursor-pointer' />
                            <div className='w-[200px] h-[200px] overflow-hidden flex justify-center items-center'>
                                {
                                    isCollected ? <img src={currentMonster.image} /> : <img src={assets.monster_unlock} />
                                }

                            </div>
                            <ChevronRight onClick={handleNext} className='size-12 text-purple cursor-pointer' />
                        </div>
                        <div className='flex'>
                            {
                                isCollected ? <p className='text-2xl font-bold text-purple'>{countMonster[currentMonster.name]}x collected</p> : <p className='text-2xl font-bold text-purple'>uncollected</p>
                            }

                        </div>
                    </div>
                    <div className='bg-lightpink border-4 border-purple rounded-b-lg px-8 py-4'>

                        <div className='flex flex-col justify-center items-center'>
                            {
                                isCollected ? <p className='text-4xl font-bold text-purple mb-4'>{currentMonster.name}</p> : <p className='text-4xl font-bold text-purple mb-4'>???</p>
                            }

                            <p className='text-2xl font-bold text-purple'>{currentMonster.chance}% chance</p>
                        </div>
                    </div>
                    {/* collection button */}
                    <div className='relative'>
                        <button onClick={homePage} className='absolute bottom-[16px] right-[16px] bg-pink border-4 border-purple rounded-full cursor-pointer'>
                            <div className='w-[60px] h-[60px] flex justify-center items-center'>
                                <Book className='size-9 text-yellow' strokeWidth={3} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection