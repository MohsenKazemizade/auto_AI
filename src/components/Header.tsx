// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-white shadow-md py-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">آسا مسیر ناوگان</h1>
      <Link href="/login">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          ورود
        </button>
      </Link>
    </div>
  </header>
);

export default Header;
