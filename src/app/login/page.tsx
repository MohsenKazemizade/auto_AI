/* eslint-disable @next/next/no-img-element */
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { login } from '@/features/auth/authSlice';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGoogle } from 'react-icons/fa';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(login({ username: data.username, password: data.password }));
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
              <label htmlFor="username" className="text-left text-sm mb-1">
                نام کاربری
              </label>
              <input
                type="text"
                id="username"
                {...register('username', { required: 'Username is required' })}
                placeholder="نام کاربری را وارد کنید"
                className="p-2 mb-4 border border-gray-300 rounded"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}

              <label htmlFor="password" className="text-left text-sm mb-1">
                رمز عبور
              </label>
              <div className="relative flex items-center border border-gray-300 rounded mb-4">
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="رمز عبور را وارد کنید"
                  className="p-2 flex-1 outline-none"
                />
                <span className="cursor-pointer p-2">👁️</span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <div className="flex items-center mb-4">
                <input type="checkbox" id="keep-signed-in" className="mr-2" />
                <label htmlFor="keep-signed-in" className="text-sm">
                  Keep Me Signed In
                </label>
              </div>

              <button
                type="submit"
                className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-4">Or continue with</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-blue-400">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-blue-600">
                  <FaFacebookF size={24} />
                </a>
                <a href="#" className="text-blue-700">
                  <FaLinkedinIn size={24} />
                </a>
                <a href="#" className="text-red-500">
                  <FaGoogle size={24} />
                </a>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                DON&apos;T HAVE AN ACCOUNT?{' '}
                <Link href="/register" className="text-blue-500">
                  SIGN UP
                </Link>
              </p>
            </div>
          </div>
          <footer className="absolute bottom-4 mt-8 text-center text-xs text-gray-500">
            <p>Copyright 2024, Dashcode All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
