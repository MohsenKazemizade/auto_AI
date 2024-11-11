'use client';

import React, { useState } from 'react';
import { paginateData, sortData, filterData } from '../actions/tableActions';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  formatter?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Column[];
  actions?: (row: any) => React.ReactNode;
  itemsPerPage?: number;
  enableSearch?: boolean;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  actions,
  itemsPerPage = 10,
  enableSearch = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = filterData(data, searchTerm);
  const sortedData = sortData(filteredData, sortKey, sortOrder);
  const paginatedData = paginateData(sortedData, currentPage, itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      {enableSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Horizontal scroll limited to the table */}
      <div className="overflow-x-auto md:overflow-x-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`border p-2 ${column.sortable ? 'cursor-pointer' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}{' '}
                  {column.sortable &&
                    sortKey === column.key &&
                    (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
              ))}
              {actions && <th className="border p-2">عملیات</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="border p-2">
                    {column.formatter
                      ? column.formatter(row[column.key], row)
                      : row[column.key] || '-'}
                  </td>
                ))}
                {actions && <td className="border p-2">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          قبلی
        </button>
        <span>
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default Table;
