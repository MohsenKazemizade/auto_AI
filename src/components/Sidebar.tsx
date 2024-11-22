/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import {
  FaChevronDown,
  FaHome,
  FaTimes,
  FaWpforms,
  FaListAlt,
} from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { useSidebar } from '../hooks/useSidebar';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [isListsOpen, setIsListsOpen] = useState(false);
  const pathname = usePathname();

  // Manage the expanded state of dropdowns based on the current route
  useEffect(() => {
    if (pathname.startsWith('/dashboard/forms')) {
      setIsFormsOpen(true);
      setIsListsOpen(false);
    }
    if (pathname.startsWith('/dashboard/lists')) {
      setIsListsOpen(true);
      setIsFormsOpen(false);
    }
    if (pathname === '/dashboard') {
      setIsFormsOpen(false);
      setIsListsOpen(false);
    }
  }, [pathname]);

  const isActive = (route: string) => pathname === route;

  return (
    <>
      <div
        className={`sticky inset-y-0 right-0 bg-gray-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300 transition-all duration-300 ${
          isSidebarExpanded ? 'w-64 smMobile:w-64' : 'w-16 smMobile:w-0'
        } h-screen flex flex-col smMobile:absolute smMobile:z-30`}
      >
        {/* Sidebar Header for Small Screens */}
        <header
          className={`${
            isSidebarExpanded ? 'block' : 'hidden'
          } flex items-center justify-center p-6 bg-gray-800 dark:bg-gray-700 `}
        >
          <img
            src="/images/asaLogo.png"
            alt="Profile"
            className={`w-14 h-14 rounded-full ${
              isSidebarExpanded ? 'block' : 'hidden'
            }`}
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
                className={`mr-4 flex-grow ${
                  isSidebarExpanded ? 'block' : 'hidden'
                } ${isActive('/dashboard') ? 'text-blue-600' : ''}`}
              >
                خانه
              </span>
            </button>
          </Link>
          {/* Forms Dropdown */}
          <div className="mt-4">
            <button
              onClick={() => setIsFormsOpen(!isFormsOpen)}
              className={`flex items-center p-5 hover:bg-gray-700 w-full text-right ${
                isFormsOpen ? 'bg-gray-700' : ''
              } ${isSidebarExpanded ? 'smMobile:flex' : 'smMobile:hidden'}`}
            >
              <FaWpforms size={20} />
              <span
                className={`mr-4 flex-grow ${
                  isSidebarExpanded ? 'block' : 'hidden'
                }`}
              >
                فرم ها
              </span>
              <FaChevronDown
                size={16}
                className={`transform transition-transform ${
                  isFormsOpen ? 'rotate-180' : 'rotate-0'
                } ${isSidebarExpanded ? 'block' : 'hidden'}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isFormsOpen && isSidebarExpanded && (
              <div className="pr-8">
                <Link href="/dashboard/forms/new-tank">
                  <button className="flex items-center p-2 text-gray-400 hover:text-gray-200 w-full text-left ">
                    <span
                      className={`${
                        isActive('/dashboard/forms/new-tank')
                          ? 'text-blue-600'
                          : ''
                      }`}
                    >
                      مخزن جدید
                    </span>
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsListsOpen(!isListsOpen)}
              className={`flex items-center p-5 hover:bg-gray-700 w-full text-right ${
                isListsOpen ? 'bg-gray-700' : ''
              } ${isSidebarExpanded ? 'smMobile:flex' : 'smMobile:hidden'}`}
            >
              <FaListAlt size={20} />
              <span
                className={`mr-4 flex-grow ${
                  isSidebarExpanded ? 'block' : 'hidden'
                }`}
              >
                لیست ها
              </span>
              <FaChevronDown
                size={16}
                className={`transform transition-transform ${
                  isListsOpen ? 'rotate-180' : 'rotate-0'
                } ${isSidebarExpanded ? 'block' : 'hidden'}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isListsOpen && isSidebarExpanded && (
              <div className="pr-8">
                <Link href="/dashboard/lists/tanks-list">
                  <button className="flex items-center p-2 text-gray-400 hover:text-gray-200 w-full text-left ">
                    <span
                      className={`${
                        isActive('/dashboard/lists/tanks-list')
                          ? 'text-blue-600'
                          : ''
                      }`}
                    >
                      لیست مخازن
                    </span>
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
        className={`${
          isSidebarExpanded ? 'smMobile:block' : ''
        } hidden absolute z-20 bg-gray-700 opacity-30 h-screen left-0 w-full`}
      ></div>
    </>
  );
};

export default Sidebar;
