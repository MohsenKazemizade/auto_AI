/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { login } from '@/features/auth/authSlice';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await dispatch(
      login({ username: data.username, password: data.password })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      const token = result.payload;
      console.log(token);
      if (token) {
        router.push('/dashboard');
      } else {
        reset();
      }
    } else {
      reset();
    }
  };

  return (
    <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full">
      <div className="flex md: flex-wrap w-full h-dvh">
        {/* Left Section */}
        <div className="hidden flex-1 lg:flex relative bg-gray-200 justify-center items-center">
          <img
            src="/images/truck-driver.jpeg"
            alt="Truck Driver"
            className="absolute inset-0 w-full h-full object-cover opacity-30 "
          />
          <div className="z-10 text-center">
            <h1 className="text-4xl text-black">
              آسامسیر <span className="font-bold">ناوگان</span>
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4">خوش آمدید</h2>
            <p className="text-sm text-gray-600 mb-8">
              برای ورود نام کاربری و رمز عبور خود را وارد کنید
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label htmlFor="username" className="text-right text-sm mb-1">
                نام کاربری
              </label>
              <input
                type="text"
                id="username"
                {...register('username', {
                  required: 'نام کاربری را وارد کنید',
                })}
                placeholder="نام کاربری را وارد کنید"
                className="p-2 mb-4 border border-gray-300 rounded text-left justy"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}

              <label htmlFor="password" className="text-right text-sm mb-1">
                رمز عبور
              </label>
              <div className="relative flex items-center border border-gray-300 rounded mb-4">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'رمز عبور را وارد کنید',
                  })}
                  placeholder="رمز عبور را وارد کنید"
                  className="p-2 flex-1 outline-none text-left"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? 'در حال بارگزاری...' : 'ورود'}
              </button>
              {error && (
                <p className="text-red-500 mt-2">
                  نام کاربری یا رمز عبور اشتباه است
                </p>
              )}
            </form>
          </div>
          <footer className="absolute bottom-4 mt-8 text-center text-xs text-gray-500">
            <p dir="ltr">
              © 2024, Designed & Developed by{' '}
              <a
                href="https://mohsenkazemi.com/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Mohsen Kazemi
              </a>
              . All Rights Reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
