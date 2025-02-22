'use client';

import React, { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Icon from 'react-multi-date-picker/components/icon';
import { FaTimes } from 'react-icons/fa';
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: Record<string, any>) => void;
  data: Record<string, any>; // Tank data to edit
  inputTypes: Record<
    string,
    {
      type: 'text' | 'date' | 'number' | 'checkbox';
      label: string;
      required: boolean;
    }
  >; // Types and labels of inputs
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  inputTypes,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(data);
  const [psiTest, setPsiTest] = useState(() => {
    if (data.PsiTest) {
      return new DateObject(data.PsiTest)
        .convert(persian, persian_fa)
        .format('YYYY/MM/DD');
    } else {
      return '';
    }
  });
  const [whiteTest, setWhiteTest] = useState(() => {
    if (data.WhiteTest) {
      return new DateObject(data.WhiteTest)
        .convert(persian, persian_fa)
        .format('YYYY/MM/DD');
    } else {
      return '';
    }
  });

  if (!isOpen) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, PsiTest: psiTest, WhiteTest: whiteTest });
  };

  const clearPsiTest = () => {
    setPsiTest('');
  };

  const clearWhiteTest = () => {
    setWhiteTest('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md 2xl:max-w-2xl smMobile:max-w-xs dark:bg-gray-700">
        <h2 className="text-xl font-bold mb-4">ویرایش</h2>
        <div className="grid grid-cols-2 smMobile:grid-cols-1 2xl:grid-cols-3 gap-4">
          {Object.entries(inputTypes).map(
            ([key, { type, label, required }]) => {
              if (key === 'PsiTest' || key === 'WhiteTest') {
                return (
                  <div
                    key={key}
                    className="flex flex-col smMobile:flex-row items-start gap-1"
                  >
                    <label
                      htmlFor={key}
                      className="block text-xs font-medium text-gray-700 dark:text-gray-100"
                    >
                      {label}
                      {required ? <span className="text-red-500">*</span> : ''}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        id={key}
                        name={key}
                        className="text-xs block w-full border border-gray-300 rounded-md dark:text-gray-700"
                        value={key === 'PsiTest' ? psiTest : whiteTest}
                        readOnly
                      />
                      <div className="relative">
                        {key === 'PsiTest' && psiTest && (
                          <button
                            onClick={clearPsiTest}
                            className="px-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                          >
                            <FaTimes />
                          </button>
                        )}
                        {key === 'WhiteTest' && whiteTest && (
                          <button
                            onClick={clearWhiteTest}
                            className="px-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-row items-center text-gray-800 dark:text-gray-200">
                        <DatePicker
                          render={<Icon />}
                          onChange={(date) => {
                            if (date) {
                              if (key === 'PsiTest') {
                                setPsiTest(
                                  new DateObject(date).format('YYYY/MM/DD')
                                );
                              } else {
                                setWhiteTest(
                                  new DateObject(date).format('YYYY/MM/DD')
                                );
                              }
                            } else {
                              // Handle clearing the date
                              if (key === 'PsiTest') {
                                setPsiTest('');
                              } else {
                                setWhiteTest('');
                              }
                            }
                          }}
                          calendar={persian}
                          locale={persian_fa}
                          calendarPosition="bottom-center"
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={key} className="flex flex-col">
                  <label className="block text-xs font-medium text-gray-700 mb-1 dark:text-gray-100">
                    {label}
                    {required ? <span className="text-red-500"> *</span> : ''}
                  </label>
                  {type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!formData[key]}
                      onChange={(e) => handleChange(key, e.target.checked)}
                      className="rounded border-gray-300 dark:text-gray-700"
                    />
                  ) : (
                    <input
                      type={type}
                      value={formData[key] || ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-700"
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
        <div className="mt-6 flex justify-between space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs bg-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-100 dark:bg-slate-800"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
