// src/contexts/SidebarContext.tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface SidebarContextProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initial state based on screen width
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev); // Always flip the value on toggle
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        // If screen width is less than 1280, ensure sidebar is collapsed
        setIsSidebarExpanded((prev) => (prev ? false : prev));
      } else if (window.innerWidth >= 1280) {
        // If screen width is 1280 or greater, ensure sidebar is expanded
        setIsSidebarExpanded((prev) => (prev ? prev : true));
      }
    };

    // Attach resize listener
    window.addEventListener('resize', handleResize);

    // Run once on mount to check initial size
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
