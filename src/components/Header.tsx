/* eslint-disable @next/next/no-img-element */
// src/components/Header.tsx
'use client';

import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaUser,
  // FaCog,
  // FaHeadset,
  // FaLock,
  // FaSignOutAlt,
} from 'react-icons/fa';
import { useSidebar } from '../hooks/useSidebar';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import LogoutButton from './LogoutButton';
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
  // notificationCount,
}) => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Add a click event listener to close the dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false); // Close the menu if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null; // Ensures the component loads correctly with SSR

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <header className="flex sticky top-0 z-10 items-center justify-between bg-white dark:bg-gray-700 text-white px-4 shadow-custom h-16">
      {/* Right side: Toggle button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-200 hover:dark:text-gray-500"
        >
          {isSidebarExpanded ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Left side: Profile info and notification */}
      <div className="flex items-center gap-3 h-full">
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
        {/* <div className="flex mx-4">
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-200 hover:dark:text-gray-500">
            <FaBell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 items-center justify-center w-3 h-3 bg-red-500 text-xs text-white rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
        </div> */}

        <div
          onClick={handleToggleMenu}
          className="group flex flex-row gap-x-4 h-full items-center cursor-pointer border-gray-300 border-x bg-gray-100 dark:bg-slate-600 dark:border-gray-800 dark:border-x px-2"
        >
          <div className="flex flex-col">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-300 text-left group-hover:text-blue-500">
              {username}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 text-left group-hover:text-blue-500">
              {accessLevel}
            </p>
          </div>
          <img
            src={profilePictureUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-16 left-0 bg-white dark:bg-gray-700 rounded-lg shadow-custom py-4 z-900 w-48 mt-1 ml-1"
          >
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 pb-2">
              خوش آمدید !
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <FaUser />
                <span>حساب کاربری</span>
              </li>
              {/* <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <FaCog />
                <span>تنظیمات</span>
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <FaHeadset />
                <span>پشتیبانی</span>
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <FaLock />
                <span>Lock Screen</span>
              </li> */}
              <LogoutButton />
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
