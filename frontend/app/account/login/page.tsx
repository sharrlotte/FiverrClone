'use client';

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

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
      <div id="container" className={`relative w-full max-w-4xl min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
        <div className={`form-container sign-in absolute top-0 h-full w-1/2 p-10 transition-transform duration-600 ${isActive ? 'transform translate-x-2/2 opacity-100 z-10' : 'transform translate-x-0 opacity-0 z-0'}`}>
          <form className="flex flex-col items-center justify-center h-full">
            <h1 className="font-bold text-xl mb-5">ĐĂNG NHẬP</h1>
            <div className="social-icons flex justify-center mb-5 space-x-2">
              <a href="#" className="icon p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="icon p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="icon p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <span className="text-sm mb-3">Hoặc đăng nhập bằng Email của bạn</span>
            <input type="email" placeholder="Email" className="w-full px-3 py-2 mt-3 text-sm bg-gray-200 rounded" />
            <input type="password" placeholder="Password" className="w-full px-3 py-2 mt-3 text-sm bg-gray-200 rounded" />
            <a href="#" className="text-sm text-gray-600 mt-3">
              Quên mật khẩu của bạn?
            </a>
            <button type="button" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase" onClick={handleRegisterClick}>
              Đăng nhập
            </button>
          </form>
        </div>

        <div className={`form-container sign-up absolute top-0 h-full w-1/2 p-10 transition-transform duration-600 ${isActive ? 'transform translate-x-0 opacity-0 z-10' : 'transform translate-x-full opacity-100 z-10'}`}>
          <form className="flex flex-col items-center justify-center h-full">
            <h1 className="font-bold text-xl mb-5">Tạo tài khoản</h1>
            <div className="social-icons flex justify-center mb-5 space-x-2">
              <a href="#" className="icon p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="icon p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="icon p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <span className="text-sm mb-3">Hoặc sửa dụng tài khoản Email của bạn</span>
            <input type="text" placeholder="Name" className="w-full px-3 py-2 mt-3 text-sm bg-gray-200 rounded" />
            <input type="email" placeholder="Email" className="w-full px-3 py-2 mt-3 text-sm bg-gray-200 rounded" />
            <input type="password" placeholder="Password" className="w-full px-3 py-2 mt-3 text-sm bg-gray-200 rounded" />
            <button type="button" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase" onClick={handleLoginClick}>
              Đăng ký
            </button>
          </form>
        </div>

        <div className={`overlay-container absolute top-0 h-full w-full flex`}>
          <div className={`overlay absolute top-0 left-0 h-full w-1/2 bg-purple-600 text-white p-10 flex items-center justify-center transition-transform duration-600 ${isActive ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold mb-3">Chào bạn !</h1>
              <p className="text-sm mb-5">Đăng ký để bắt đầu hàng trình của bạn</p>
              <button className="px-6 py-2 text-sm font-semibold bg-white text-purple-600 rounded uppercase" onClick={handleRegisterClick}>
                Đăng ký
              </button>
            </div>
          </div>
          <div className={`overlay absolute top-0 right-0 h-full w-1/2 bg-purple-600 text-white p-10 flex items-center justify-center transition-transform duration-600 ${isActive ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold mb-3">Chào mừng trở lại!</h1>
              <p className="text-sm mb-5">Tiếp tục hành trình của bạn</p>
              <button className="px-6 py-2 text-sm font-semibold bg-white text-purple-600 rounded uppercase" onClick={handleLoginClick}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
