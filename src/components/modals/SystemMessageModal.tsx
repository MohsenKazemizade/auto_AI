// src/components/modals/SystemMessageModal.tsx
'use client';

import React from 'react';

interface SystemMessageModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const SystemMessageModal: React.FC<SystemMessageModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            خیر
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            بله
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemMessageModal;
