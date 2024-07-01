'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import env from '@/constant/env';
import { RegisterRequest, registerRequest, registerSchema } from '../../../schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../components/ui/use-toast';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

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
      <div id="container" className={`relative w-full max-w-4xl min-h-[520px] bg-white rounded-2xl shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
        <div className={`form-container sign-in absolute top-0 h-full w-1/2 p-10 transition-transform duration-600 ${isActive ? 'transform translate-x-2/2 opacity-100 z-50' : 'transform translate-x-0 opacity-0 z-0'}`}>
          <LoginPanel />
        </div>

        <div className={`form-container sign-up absolute top-0 h-full w-1/2 p-10 transition-transform duration-600 ${isActive ? 'transform translate-x-0 opacity-0 z-10' : 'transform translate-x-full opacity-100 z-10'}`}>
          <RegisterPanel />
        </div>

        <div className={`overlay-container absolute top-0 h-full w-full flex`}>
          <div className={`overlay absolute top-0 left-0 h-full w-1/2 bg-purple-600 text-white p-10 flex items-center justify-center transition-transform duration-600 ${isActive ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold mb-3">Chào bạn !</h1>
              <p className="text-sm mb-5">Đăng ký để bắt đầu hàng trình của bạn</p>
              <button className="px-6 py-2 text-sm font-semibold bg-white text-purple-600 rounded uppercase" onClick={handleRegisterClick}>
                Đăng nhập
              </button>
            </div>
          </div>
          <div className={`overlay absolute top-0 right-0 h-full w-1/2 bg-purple-600 text-white p-10 flex items-center justify-center transition-transform duration-600 ${isActive ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold mb-3">Chào mừng trở lại!</h1>
              <p className="text-sm mb-5">Tiếp tục hành trình của bạn</p>
              <button className="px-6 py-2 text-sm font-semibold bg-white text-purple-600 rounded uppercase" onClick={handleLoginClick}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


function RegisterPanel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: RegisterRequest) => registerRequest(value),
    onSuccess: () => {
      queryClient.invalidateQueries();
      form.reset();
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 409:
          toast({
            title: 'Lỗi',
            description: 'Tên tài khoản đã tồn tại, vui lòng chọn tên khác',
            variant: 'destructive',
          });
          break;

        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    }
  });



  return <>
    <h1 className="font-bold text-xl mb-5 flex justify-center mt-8">Tạo tài khoản</h1>
    <div className="social-icons flex justify-center mb-5 space-x-2">
      <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
        <FontAwesomeIcon icon={faGooglePlusG} />
      </Link>
      <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
        <FontAwesomeIcon icon={faFacebookF} />
      </Link>
      <Link href={`${env.url.backend_url}/auth/github`} className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
        <FontAwesomeIcon icon={faGithub} />
      </Link>
    </div>
    <span className="text-sm mb-7">Hoặc sửa dụng tài khoản Email của bạn</span>
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Nhập email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button type="submit" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase">
            đăng ký
          </Button>
        </div>
      </form>
    </Form>
  </>
}

function LoginPanel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: RegisterRequest) => registerRequest(value),
    onSuccess: () => {
      queryClient.invalidateQueries();
      form.reset();
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 409:
          toast({
            title: 'Lỗi',
            description: 'Tên tài khoản đã tồn tại, vui lòng chọn tên khác',
            variant: 'destructive',
          });
          break;

        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    }
  });



  return <>
    <h1 className="font-bold text-xl mb-5 flex justify-center mt-8">Tạo tài khoản</h1>
    <div className="social-icons flex justify-center mb-5 space-x-2">
      <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
        <FontAwesomeIcon icon={faGooglePlusG} />
      </Link>
      <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
        <FontAwesomeIcon icon={faFacebookF} />
      </Link>
      <Link href={`${env.url.backend_url}/auth/github`} className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
        <FontAwesomeIcon icon={faGithub} />
      </Link>
    </div>
    <span className="text-sm mb-7">Hoặc sửa dụng tài khoản Email của bạn</span>
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Nhập email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập lại mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button type="submit" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase">
            đăng ký
          </Button>
        </div>
      </form>
    </Form>
  </>
}


