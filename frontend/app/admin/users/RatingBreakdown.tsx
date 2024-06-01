"user client";
import React from 'react'

export default function () {
    return (
        <div className='mt-12 flex flex-col'>
            <div>
                <span className='font-black'>Rating Breakedown</span>
            </div>
            <div className='flex gap-28 opacity-50'>
                <span>Seller communication level</span>
                <span>5 sao</span>
            </div>
            <div className='flex gap-32 opacity-50'>
                <span>Recommend to a friend</span>
                <span>4.9 sao</span>
            </div>
            <div className='flex gap-40 opacity-50'>
                <span>Service as described</span>
                <span>5 sao</span>
            </div>
        </div>
    )
}
