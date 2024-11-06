/* eslint-disable @next/next/no-img-element */
// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { FaFileAlt, FaChevronDown, FaHome, FaTimes } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { useSidebar } from '../hooks/useSidebar';

const Sidebar: React.FC = () => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const [isFormsOpen, setIsFormsOpen] = useState(false);

  return (
    <>
      <div
        className={`sticky inset-y-0 right-0 bg-gray-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300 transition-all duration-300 ${isSidebarExpanded ? 'w-64 smMobile:w-64' : 'w-16 smMobile:w-0'} h-screen flex flex-col smMobile:absolute smMobile:z-30`}
      >
        {/* Sidebar Header for Small Screens */}
        <header
          className={`${isSidebarExpanded ? 'block' : 'hidden'} flex items-center justify-center p-6 bg-gray-800 dark:bg-gray-700 md:hidden`}
        >
          <img
            src="/images/asaLogo.png"
            alt="Profile"
            className={`w-14 h-14 rounded-full ${isSidebarExpanded ? 'block' : 'hidden'}`}
          />
          <button
            onClick={toggleSidebar}
            className="hidden smMobile:block absolute text-gray-400 hover:text-gray-200 left-0 top-0 mt-5 ml-4"
          >
            <FaTimes size={18} />
          </button>
        </header>

        {/* Navigation Links */}
        <nav className="flex-grow mt-20">
          {/* Home Menu Item */}
          <Link href="/dashboard">
            <button
              className={`flex items-center p-5 hover:bg-gray-700 w-full text-right ${isSidebarExpanded ? 'smMobile:flex' : 'smMobile:hidden'}`}
            >
              <FaHome size={20} />
              <span
                className={`mr-4 flex-grow ${isSidebarExpanded ? 'block' : 'hidden'}`}
              >
                خانه
              </span>
            </button>
          </Link>
          {/* Forms Dropdown */}
          <div className="mt-4">
            <button
              onClick={() => setIsFormsOpen(!isFormsOpen)}
              className={`flex items-center p-5 hover:bg-gray-700 w-full text-right ${isSidebarExpanded ? 'smMobile:flex' : 'smMobile:hidden'}`}
            >
              <FaFileAlt size={20} />
              <span
                className={`mr-4 flex-grow ${isSidebarExpanded ? 'block' : 'hidden'}`}
              >
                فرم ها
              </span>
              <FaChevronDown
                size={16}
                className={`transform transition-transform ${isFormsOpen ? 'rotate-180' : 'rotate-0'} ${isSidebarExpanded ? 'block' : 'hidden'}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isFormsOpen && isSidebarExpanded && (
              <div className="pr-8">
                <Link href="/dashboard/forms/new-tank">
                  <button className="flex items-center p-2 text-gray-400 hover:text-gray-200 w-full text-left">
                    <span>مخزن جدید</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
        <footer>
          <LogoutButton isSidebarExpanded={isSidebarExpanded} />
        </footer>
      </div>
      <div
        onClick={toggleSidebar}
        className={`${isSidebarExpanded ? 'smMobile:block' : ''} hidden absolute z-20 bg-gray-700 opacity-30 h-screen left-0 w-full`}
      ></div>
    </>
  );
};

export default Sidebar;
