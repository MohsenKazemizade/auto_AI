// src/app/login/page.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { login } from '@/features/auth/authSlice';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-gray-500"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'Username is required' })}
              placeholder="Enter your username"
              className="w-full p-2 border rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
