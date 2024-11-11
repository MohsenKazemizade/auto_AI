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
  SubmitDateTime: string;
}

export default function TanksList({ tanks }: { tanks: Tank[] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  const columns = [
    { key: 'Supervisor', label: 'کرییر', sortable: true },
    { key: 'TankOwner', label: 'صاحب مخزن', sortable: true },
    { key: 'TankNumber', label: 'شماره مخزن', sortable: true },
    { key: 'SubmitDateTime', label: 'تاریخ ثبت', sortable: true },
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
          <div className="flex gap-2">
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
