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
import { GiFuelTank } from 'react-icons/gi';
// import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { useSidebar } from '../hooks/useSidebar';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [isListsOpen, setIsListsOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuClick = () => {
    const isMobileViewport = window.matchMedia(
      '(min-width: 300px) and (max-width: 768px)'
    ).matches;

    if (isMobileViewport) {
      if (!isSidebarExpanded) return; // Do nothing if already collapsed
      toggleSidebar(); // Collapse the sidebar
    }
  };
  // const handleMenuIconClicked = () => {};
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

  const isActiveHome = (route: string) => pathname === route;
  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <>
      <div
        className={`sticky inset-y-0 right-0 bg-gray-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300 transition-all duration-300 ${
          isSidebarExpanded ? 'w-64 smMobile:w-64' : 'w-16 smMobile:w-0'
        } h-screen flex flex-col smMobile:fixed smMobile:overflow-y-auto smMobile:z-30`}
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
            className={`w-20 h-20 rounded-full ${
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
              onClick={handleMenuClick}
              className={`flex items-center p-5 hover:bg-gray-700 w-full text-right ${isSidebarExpanded ? 'smMobile:flex' : 'smMobile:hidden'}`}
            >
              <FaHome
                size={20}
                className={`${
                  !isSidebarExpanded && isActiveHome('/dashboard')
                    ? 'text-blue-600'
                    : ''
                } ${isActiveHome('/dashboard') ? 'text-blue-600' : ''}`}
                onClick={() => {
                  if (!isSidebarExpanded) {
                    toggleSidebar();
                    handleMenuClick();
                  } else {
                    handleMenuClick();
                  }
                }}
              />
              <span
                className={`mr-4 flex-grow ${
                  isSidebarExpanded ? 'block' : 'hidden'
                } ${isActiveHome('/dashboard') ? 'text-blue-600' : ''}`}
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
              <FaWpforms
                size={20}
                className={`${
                  !isSidebarExpanded && isActive('/dashboard/forms')
                    ? 'text-blue-600'
                    : ''
                }`}
                onClick={() => {
                  if (!isSidebarExpanded) {
                    toggleSidebar();
                    setIsFormsOpen(!isFormsOpen);
                  } else {
                    setIsFormsOpen(!isFormsOpen);
                  }
                }}
              />
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
                  <button
                    onClick={handleMenuClick}
                    className="flex items-center p-2 text-gray-400 hover:text-gray-200 w-full text-left "
                  >
                    <GiFuelTank
                      size={20}
                      className={`${
                        isActive('/dashboard/forms/new-tank')
                          ? 'text-blue-600'
                          : ''
                      }`}
                    />
                    <span
                      className={`mr-4 ${
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
              <FaListAlt
                size={20}
                className={`${
                  !isSidebarExpanded && isActive('/dashboard/lists')
                    ? 'text-blue-600'
                    : ''
                }`}
                onClick={() => {
                  if (!isSidebarExpanded) {
                    toggleSidebar();
                    setIsListsOpen(!isListsOpen);
                  } else {
                    setIsListsOpen(!isListsOpen);
                  }
                }}
              />
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
                  <button
                    onClick={handleMenuClick}
                    className="flex items-center p-2 text-gray-400 hover:text-gray-200 w-full text-left "
                  >
                    <GiFuelTank
                      size={20}
                      className={`${
                        isActive('/dashboard/lists/tanks-list')
                          ? 'text-blue-600'
                          : ''
                      }`}
                    />
                    <span
                      className={`mr-4 ${
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
          {/* <LogoutButton isSidebarExpanded={isSidebarExpanded} /> */}
        </footer>
      </div>
      <div
        onClick={toggleSidebar}
        className={`${
          isSidebarExpanded ? 'smMobile:block' : ''
        } hidden absolute z-20 smMobile:fixed bg-gray-700 opacity-30 h-screen left-0 w-full`}
      ></div>
    </>
  );
};

export default Sidebar;
