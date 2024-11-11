'use client';

import React, { useState } from 'react';
import Table from '../Table';
import CardView from '../CardView';
import { deleteTank } from '@/actions/tankActions';
import { useSearchParams } from 'next/navigation';

interface Tank {
  TankNumber: string;
  TankOwner: string;
  Supervisor: string;
  DriverFullName: string;
  TruckPlateNumber: string;
  SubmitDateTime: string;
  PsiTest: string;
  WhiteTest: string;
}

export default function TanksList({ tanks }: { tanks: Tank[] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  const formatPersianDate = (date: string, includeTime = false) => {
    if (!date) return '-';
    const options: Intl.DateTimeFormatOptions = includeTime
      ? {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      : {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
    return new Intl.DateTimeFormat('fa-IR', options).format(new Date(date));
  };
  const columns = [
    { key: 'TankNumber', label: 'شماره مخزن', sortable: true, primary: true },
    { key: 'Supervisor', label: 'کرییر', sortable: true, primary: true },
    {
      key: 'DriverFullName',
      label: 'نام راننده',
      sortable: true,
      primary: true,
    },
    {
      key: 'WhiteTest',
      label: 'تست سفید',
      sortable: true,
      formatter: (value: string) => formatPersianDate(value),
    },
    {
      key: 'PsiTest',
      label: 'تست PSI',
      sortable: true,
      formatter: (value: string) => formatPersianDate(value),
    },
    { key: 'DriverFullName', label: 'راننده', sortable: true },
    { key: 'TruckPlateNumber', label: 'شماره پلاک', sortable: true },
    {
      key: 'SubmitDateTime',
      label: 'تاریخ ثبت',
      sortable: true,
      formatter: (value: string) => formatPersianDate(value, true),
    },
  ];
  const handleDelete = async (TankNumber: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این مخزن را حذف کنید؟')) {
      deleteTank(TankNumber);
    }
  };

  return (
    <CardView title="لیست مخازن">
      {error && <p className="text-red-500">خطا: {error}</p>}
      {success && <p className="text-green-500">عملیات با موفقیت انجام شد.</p>}
      <Table
        columns={columns}
        data={tanks}
        itemsPerPage={10}
        actions={(row) => (
          <div className="flex gap-2 justify-center">
            <button className="px-2 py-1 bg-yellow-400 rounded text-white">
              ویرایش
            </button>
            <button
              className="px-2 py-1 bg-red-500 rounded text-white"
              onClick={() => handleDelete(row.TankNumber)}
            >
              حذف
            </button>
          </div>
        )}
      />
    </CardView>
  );
}
