'use client';
import React from 'react'
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';

export default function Evaluate() {
    return (
        <div>
            <div className='flex flex-row gap-5 font-black'>
                <span>danh gia</span>
                <span>115 review</span>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <div className='flex flex-row gap-4'>
                    <Button>
                        <span>5 sao</span>
                    </Button>
                    <Progress className='mt-3' value={80} />
                    <span className='mt-1'>(109)</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <Button>
                        <span>4 sao</span>
                    </Button>
                    <Progress className='mt-3' value={20} />
                    <span className='mt-1'>(5)</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <Button>
                        <span>3 sao</span>
                    </Button>
                    <Progress className='mt-3' value={1} />
                    <span className='mt-1'>(1)</span>
                </div>
                <div className='flex flex-row gap-4 opacity-50'>
                    <Button>
                        <span>2 sao</span>
                    </Button>
                    <Progress className='mt-3' value={0} />
                    <span className='mt-1'>(0)</span>
                </div>
                <div className='flex flex-row gap-4 opacity-50'>
                    <Button>
                        <span>1 sao</span>
                    </Button>
                    <Progress className='mt-3' value={0} />
                    <span className='mt-1'>(0)</span>
                </div>
            </div>
        </div>
    )
}
