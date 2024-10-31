// src/components/LoginForm.tsx
'use client';
import React from 'react';
import { handleLoginSubmit } from '../actions/sessionActions';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <form action={handleLoginSubmit} method="post" className="flex flex-col">
      {error && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
          {decodeURIComponent(error)}
        </div>
      )}

      <label htmlFor="username" className="text-right text-sm mb-1">
        نام کاربری
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="نام کاربری را وارد کنید"
        className="p-2 mb-4 border border-gray-300 rounded"
        required
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity(
            'نام کاربری الزامی است'
          )
        }
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
      />

      <label htmlFor="password" className="text-right text-sm mb-1">
        رمز عبور
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="رمز عبور را وارد کنید"
        className="p-2 mb-4 border border-gray-300 rounded"
        required
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity(
            'رمز عبور الزامی است'
          )
        }
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
      />

      <button
        type="submit"
        className="bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 transition"
      >
        ورود
      </button>
    </form>
  );
};

export default LoginForm;
