import React from 'react'
import { motion } from 'framer-motion'

const Reset = ({ onConfirm, onCancel }) => {

    return (
        <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='w-[301px] h-[256px] flex flex-col justify-center items-center'>
            <div className='w-full h-[76px] flex justify-center items-center bg-pink px-4 py-4 border-4 border-purple rounded-t-lg'>
                <p className='text-4xl text-yellow text-center font-bold'>Attention !</p>
            </div>
            <div className='w-full h-[180px] flex flex-col justify-center items-center bg-lightpink border-4 border-t-0 border-purple rounded-b-lg px-4 py-4 gap-2'>
                <div className='w-full flex'>
                    <p className='text-2xl text-purple text-center font-bold'>
                        Do you want to reset
                        all the number of
                        this collection
                    </p>
                </div>
                <div className='w-full flex justify-center items-center gap-4'>
                    <button onClick={onConfirm} className='w-full bg-yellow px-4 py-1 border-4 border-purple rounded-lg text-2xl text-purple text-center font-bold cursor-pointer'>Yes</button>
                    <button onClick={onCancel} className='w-full bg-pink px-4 py-1 border-4 border-purple rounded-lg text-2xl text-lightpink text-center font-bold cursor-pointer'>No</button>
                </div>
            </div>
        </motion.div>
    )
}

export default Reset