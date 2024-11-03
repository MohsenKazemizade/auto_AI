/* eslint-disable @next/next/no-img-element */
// src/components/Header.tsx
'use client';

import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { useSidebar } from '../hooks/useSidebar';

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
  return (
    <header className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-lg">
      {/* Right side: Toggle button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleSidebar}
          className="text-gray-400 hover:text-gray-200"
        >
          {isSidebarExpanded ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Left side: Profile info and notification */}
      <div className="flex items-center space-x-4">
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-400">{accessLevel}</p>
        </div>

        <div className="border-l border-gray-600 h-8 mx-4"></div>

        {/* Notification bell */}
        <div className="relative">
          <FaBell size={24} className="text-white cursor-pointer" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 bg-red-500 text-xs text-white rounded-full">
              {notificationCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
