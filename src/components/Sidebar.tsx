// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { FaFileAlt, FaChevronDown, FaHome } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { useSidebar } from '../hooks/useSidebar';

const Sidebar: React.FC = () => {
  const { isSidebarExpanded } = useSidebar();
  const [isFormsOpen, setIsFormsOpen] = useState(false);

  return (
    <div
      className={`inset-y-0 right-0 bg-gray-800 text-gray-200 transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'} h-screen flex flex-col`}
    >
      {/* Navigation Links */}
      <nav className="flex-grow mt-20">
        {/* Home Menu Item */}
        <Link href="/dashboard">
          <button className="flex items-center p-5 hover:bg-gray-700 w-full text-right">
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
            className="flex items-center p-5 hover:bg-gray-700 w-full text-right"
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
              <button
                // onClick={sidebarActions.goToNewTank}
                className="flex items-center p-2 text-gray-400 hover:text-gray-200 w-full text-left"
              >
                <span>مخزن جدید</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <footer>
        <LogoutButton isSidebarExpanded={isSidebarExpanded} />
      </footer>
    </div>
  );
};

export default Sidebar;
