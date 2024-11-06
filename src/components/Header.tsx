/* eslint-disable @next/next/no-img-element */
// src/components/Header.tsx
'use client';

import { FaBell, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useSidebar } from '../hooks/useSidebar';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface HeaderProps {
  username: string;
  accessLevel: string;
  profilePictureUrl: string;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({
  username,
  accessLevel,
  profilePictureUrl,
  notificationCount,
}) => {
  const handleToggleSidebar = () => {
    toggleSidebar();
    // Optionally trigger a re-render if needed using other state management solutions
  };
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null; // Ensures the component loads correctly with SSR

  return (
    <header className="flex sticky top-0 z-10 items-center justify-between bg-white dark:bg-gray-700 text-white p-3 shadow-custom">
      {/* Right side: Toggle button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleSidebar}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-200 hover:dark:text-gray-500"
        >
          {isSidebarExpanded ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Left side: Profile info and notification */}
      <div className="flex items-center space-x-4">
        {/* Theme toggle button */}
        <div className="flex mx-4 items-center">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-200 hover:dark:text-gray-500"
          >
            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
        {/* Notification bell */}
        <div className="flex mx-4">
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-200 hover:dark:text-gray-500">
            <FaBell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 items-center justify-center w-3 h-3 bg-red-500 text-xs text-white rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
        <div className="border-l border-gray-600 h-6"></div>
        <div className="flex flex-col items-end">
          <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
            {username}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {accessLevel}
          </p>
        </div>
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
