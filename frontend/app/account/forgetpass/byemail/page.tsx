'use client';

import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../../../components/ui/input-otp';
import { Button } from '@headlessui/react';

const LoginRegister: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const otpSlots = Array.from({ length: 6 }, (_, index) => index);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
            <div id="container" className={`relative w-full max-w-3xl min-h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
                <div></div>
                <div className="flex justify-center items-center mt-24 ">
                    <form className="flex flex-col items-center justify-center h-full w-9/12 gap-5">
                        <h1 className="font-bold text-5xl mb-5 text-nowrap">Vui lòng nhập email xác nhận</h1>
                        <span className="text-sm mb-3 text-nowrap">Hãy nhập email của bạn</span>
                        <div className='flex flex-row gap-8'>
                            <div>
                                <input type="text" placeholder="email@gmail.com" className="w-[360px] px-3 py-3 mt-5 text-sm bg-gray-200 rounded" />
                                <div className='mt-5'>
                                    <InputOTP maxLength={6}>
                                        <InputOTPGroup className="flex gap-2">
                                            {otpSlots.map((index) => (
                                                <InputOTPSlot className="h-20 w-20 text-5xl border" key={index} index={index} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                            <div className='mt-7'>
                                <Button>
                                    <span className='text-blue-600 uppercase font-semibold'>gửi</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-row gap-48 mt-20">
                            <li className="mt-4 px-6 py-2 text-sm font-semibold text-blue-600 rounded uppercase list-none">
                                <a href=""> QUAY LAI</a>
                            </li>
                            <Button className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded uppercase">
                                đồng ý
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;