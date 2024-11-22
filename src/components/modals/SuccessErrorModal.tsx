// src/components/modals/SuccessErrorModal.tsx
'use client';

import React from 'react';

interface SuccessErrorModalProps {
  title: string;
  message: string;
  isSuccess?: boolean; // true for success, false for error
  onClose: () => void;
}

const SuccessErrorModal: React.FC<SuccessErrorModalProps> = ({
  title,
  message,
  isSuccess = true,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-600">
        <h2
          className={`text-xl font-bold mb-4 ${
            isSuccess ? 'text-green-500 dark:text-green-600' : 'text-red-500'
          }`}
        >
          {title}
        </h2>
        <p className="text-gray-700 mb-6 dark:text-gray-100">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessErrorModal;
