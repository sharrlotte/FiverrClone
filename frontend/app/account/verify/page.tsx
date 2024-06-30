'use client';
import React, { useState } from "react";
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
const LoginRegister: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
          <div id="container" className={`relative w-full max-w-3xl min-h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
              <div className="flex justify-center items-center mt-24">
                <form className="flex flex-col items-center justify-center h-full w-8/12">
                          <h1 className="font-bold text-4xl mb-5">Xác nhận tài khoản</h1>
                          <span className="text-1xl mb-2 ">Vui lòng xác nhận địa chỉ e-mail của bạn và nhập mã </span>
                          <span>xác minh mà chúng tôi đã gửi cho bạn.</span>
                          <div className="w-96">
                            <span className="font-bold text-1xl flex mt-5">Mã xác nhận </span>
                            <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                          </div>
                          <div className="flex flex-row">
                            <div className="flex flex-row gap-5">
                          <button type="button" className="mt-10 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase" onClick={handleLoginClick}>
                                Mã xác nhận 
                          </button>
                            </div>
                            <div className="mt-24">
                                
                            </div>
                          </div>
                      </form>
                </div>         
          </div>
          </div>
    );
  };  
export default LoginRegister;