'use client';

import React, { useState } from 'react';
import Table from '../Table';
import CardView from '../CardView';
import { deleteTank } from '@/actions/tankActions';
import { useRouter, useSearchParams } from 'next/navigation';
import EditModal from './EditModal';
import { updateTank } from '@/actions/tankActions';
interface Tank {
  TankNumber: string;
  TankOwner: string;
  Supervisor: string | null; // Allow null
  DriverFullName: string | null; // Allow null
  TruckPlateNumber: string | null; // Allow null
  SubmitDateTime: string;
  PsiTest: string | null;
  WhiteTest: string | null;
}

export default function TanksList({ tanks }: { tanks: Tank[] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTank, setEditingTank] = useState<Tank | null>(null);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');
  const router = useRouter();

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
    { key: 'Supervisor', label: 'کرییر', sortable: true, primary: true },
    { key: 'TankOwner', label: 'صاحب مخزن', sortable: true, primary: true },
    { key: 'TankNumber', label: 'شماره مخزن', sortable: true, primary: true },
    {
      key: 'WhiteTest',
      label: 'تست سفید',
      sortable: true,
      primary: false,
      formatter: (value: string) => formatPersianDate(value),
    },
    {
      key: 'PsiTest',
      label: 'psiتست ',
      sortable: true,
      primary: false,
      formatter: (value: string) => formatPersianDate(value),
    },
    { key: 'DriverFullName', label: 'راننده', sortable: true, primary: false },
    {
      key: 'DriverPhoneNumber',
      label: 'شماره تماس راننده',
      sortable: true,
      primary: false,
    },
    {
      key: 'TruckPlateNumber',
      label: 'شماره پلاک',
      sortable: true,
      primary: false,
    },
    {
      key: 'SubmitDateTime',
      label: 'تاریخ ثبت',
      sortable: true,
      primary: false,
      formatter: (value: string) => formatPersianDate(value, true),
    },
  ];

  const handleDelete = async (TankNumber: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این مخزن را حذف کنید؟')) {
      deleteTank(TankNumber);
    }
  };

  const handleEditClick = (row: Tank) => {
    setEditingTank(row);
    setModalVisible(true);
  };

  const handleUpdate = async (updatedData: Record<string, any>) => {
    if (editingTank) {
      await updateTank(editingTank.TankNumber, updatedData);
      setModalVisible(false);
      router.replace('/dashboard/lists/tanks-list?success=true');
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
            <button
              className="px-2 py-1 bg-yellow-400 rounded text-white"
              onClick={() => handleEditClick(row)}
            >
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
      {modalVisible && editingTank && (
        <EditModal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleUpdate}
          data={editingTank}
          inputTypes={{
            Supervisor: { type: 'text', label: 'کرییر', required: true },
            TankOwner: { type: 'text', label: 'صاحب مخزن', required: true },
            TankNumber: { type: 'text', label: 'شماره مخزن', required: true },
            TruckCaputageCompany: {
              type: 'text',
              label: 'کاپوتاژ',
              required: false,
            },
            WhiteTest: { type: 'date', label: 'تست سفید', required: false },
            PsiTest: { type: 'date', label: 'تست PSI', required: false },
            TruckPlateNumber: {
              type: 'text',
              label: 'شماره پلاک',
              required: false,
            },
            TruckTransitNumber: {
              type: 'text',
              label: 'پلاک ترانزیت',
              required: false,
            },
            DriverFullName: {
              type: 'text',
              label: 'نام راننده',
              required: false,
            },
            DriverLisenceNumber: {
              type: 'text',
              label: 'شماره گواهینامه',
              required: false,
            },
            DriverPhoneNumber: {
              type: 'text',
              label: 'شماره تماس راننده',
              required: false,
            },
          }}
        />
      )}
    </CardView>
  );
}
