// src/components/CardView.tsx
import React from 'react';

interface CardViewProps {
  title: string;
  children: React.ReactNode;
}

const CardView: React.FC<CardViewProps> = ({ title, children }) => {
  return (
    <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-custom">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h4 className="card-title mb-1 text-lg font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h4>
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
};

export default CardView;
