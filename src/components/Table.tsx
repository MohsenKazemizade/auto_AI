'use client';

import React, { useState } from 'react';
import { paginateData, sortData, filterData } from '../actions/tableActions';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  formatter?: (value: any, row: any) => React.ReactNode;
  primary?: boolean; // New property for primary columns
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
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
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
  const toggleRowExpand = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div>
      {enableSearch && (
        <div className="mb-4 relative max-w-fit">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="px-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          )}
        </div>
      )}

      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              {/* Expand/Collapse Icon Header (visible only for smMobile) */}
              <th className="border p-2 smMobile:table-cell hidden">+</th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`border p-2 ${
                    column.sortable ? 'cursor-pointer' : ''
                  } smMobile:${!column.primary ? 'hidden' : 'table-cell'}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}{' '}
                  {column.sortable &&
                    sortKey === column.key &&
                    (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
              ))}
              {/* Keep عملیات column always visible */}
              {actions && <th className="border p-2">عملیات</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => {
              const isExpanded = expandedRows[row.TankNumber];
              return (
                <>
                  <tr key={row.TankNumber} className="hover:bg-gray-50">
                    {/* Expand/Collapse Icon (visible only for smMobile) */}
                    <td className="border p-2 text-center smMobile:table-cell hidden">
                      <button
                        onClick={() => toggleRowExpand(row.TankNumber)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`border p-2 smMobile:${
                          !column.primary ? 'hidden' : 'table-cell'
                        }`}
                      >
                        {column.formatter
                          ? column.formatter(row[column.key], row)
                          : row[column.key] || '-'}
                      </td>
                    ))}
                    {/* Always display عملیات */}
                    {actions && <td className="border p-2">{actions(row)}</td>}
                  </tr>

                  {/* Expanded Row for Non-Primary Columns (visible only for smMobile) */}
                  {isExpanded && (
                    <tr className="bg-gray-50 smMobile:table-row hidden">
                      <td colSpan={columns.length + 2}>
                        <div className="p-2">
                          {columns
                            .filter((column) => !column.primary)
                            .map((column) => (
                              <div key={column.key} className="mb-2">
                                <strong>{column.label}: </strong>
                                {column.formatter
                                  ? column.formatter(row[column.key], row)
                                  : row[column.key] || '-'}
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
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
