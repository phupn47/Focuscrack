import React, { useEffect, useRef, useState } from 'react'
import { assets, monsters } from '../assets/assets'
import { X } from 'lucide-react'

const Gotcha = () => {

    const getRandomMonster = () => {
        const totalChance = monsters.reduce((sum, curr) => sum + curr.chance, 0);
        const randomChance = Math.random() * totalChance;

        let cumulative = 0;
        for (let i = 0; i < monsters.length; i++) {
            cumulative += monsters[i].chance;
            if (randomChance < cumulative) {
                return monsters[i];
            }
        }
        return monsters[0]; // fallback
    }

    const [monster] = useState(getRandomMonster());

    const [countMonster, setCountMonster] = useState(() => {
        const stored = localStorage.getItem('countMonster');
        return stored ? JSON.parse(stored) : {}
    });

    const hasCount = useRef(false);


    useEffect(() => {
        if (!hasCount.current && monster) {
            hasCount.current = true

            setCountMonster(prev => {
                const update = {
                    ...prev,
                    [monster.name]: (prev[monster.name] || 0) + 1
                }
                return update
            })
        }
    }, [monster]);

    useEffect(() => {
        localStorage.setItem('countMonster', JSON.stringify(countMonster));
        console.log("Random Monster:", monster);
    }, [countMonster])

    if (!monster) {
        return <p className='text-center text-bold text-purple text-2xl'>Loading...</p>;
    }

    return (
        <div className='w-full h-screen bg-lightpink flex justify-center items-center'>
            <div className='bg-gradient-to-b from-pink via-lightpink to-pink w-[450px] h-[600px] border-4 border-purple rounded-xl p-8'>
                <div className='w-full h-full flex flex-col justify-between bg-yellow rounded-lg'>
                    <div className='bg-lightpink border-4 border-purple rounded-t-lg px-8 py-4'>
                        <p className='text-5xl text-center text-purple font-bold'>Gotcha !</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-[200px] h-[200px] overflow-hidden flex justify-center items-center'>
                            <img src={monster.image} />
                        </div>
                    </div>
                    <div className='bg-lightpink border-4 border-purple rounded-b-lg px-8 py-4'>
                        <div className='flex flex-col justify-center text-center'>
                            <p className='text-4xl text-center text-purple font-bold mb-4'>You got {monster.name}</p>
                            <p className='text-2xl text-center text-purple font-bold mb-4'>{countMonster[monster.name]}x collected</p>
                        </div>
                        <div className='flex justify-center gap-4'>
                            <a href='/' className='w-[80px] h-[80px] flex justify-center items-center bg-pink border-4 border-purple rounded-full'>
                                <X className='size-12 text-yellow' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gotcha