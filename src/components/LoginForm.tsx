// src/app/page.tsx
import React from 'react';
import { login } from '../actions/sessionActions';
const LoginForm = async () => {
  // Render the landing page if not authenticated
  return (
    <form action={login} className="flex flex-col">
      <label htmlFor="username" className="text-right text-sm mb-1">
        نام کاربری
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="نام کاربری را وارد کنید"
        className="p-2 mb-4 border border-gray-300 rounded text-left justy"
      />

      <label htmlFor="password" className="text-right text-sm mb-1">
        رمز عبور
      </label>
      <div className="relative flex items-center border border-gray-300 rounded mb-4">
        <button type="button" className="p-2"></button>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="رمز عبور را وارد کنید"
          className="p-2 flex-1 outline-none text-left"
        />
      </div>

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
