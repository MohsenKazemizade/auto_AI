'use client';

import React, { useState, useEffect } from 'react';
import Table from '../Table';
import CardView from '../CardView';
import { deleteTank } from '@/actions/tankActions';
import { useRouter, useSearchParams } from 'next/navigation';
import EditModal from './EditModal';
import { updateTank } from '@/actions/tankActions';
import SystemMessageModal from '@/components/modals/SystemMessageModal';
import SuccessErrorModal from '../modals/SuccessErrorModal';
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

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedTankNumber, setSelectedTankNumber] = useState<string | null>(
    null
  );

  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const deletesuccess = searchParams.get('deleteSuccess');
  const editsuccess = searchParams.get('editSuccess');
  const router = useRouter();

  useEffect(() => {
    if (deletesuccess) {
      setShowDeleteSuccessModal(true);
    }
    if (editsuccess) {
      setShowEditSuccessModal(true);
    }
  }, [deletesuccess, editsuccess]);

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
    { key: 'tablerowcount', label: 'ردیف', sortable: false, primary: true },
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
    {
      key: 'TruckCaputageCompany',
      label: 'کاپوتاژ',
      sortable: true,
      primary: false,
    },
    { key: 'DriverFullName', label: 'راننده', sortable: true, primary: false },
    {
      key: 'DriverPhoneNumber',
      label: 'شماره تماس راننده',
      sortable: true,
      primary: false,
    },
    {
      key: 'DriverLisenceNumber',
      label: 'شماره گواهینامه راننده',
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
      key: 'TruckTransitNumber',
      label: 'پلاک ترانزیت',
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
    setSelectedTankNumber(TankNumber);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTankNumber) {
      deleteTank(selectedTankNumber);
    }
    setConfirmModalVisible(false);
  };

  const handleEditClick = (row: Tank) => {
    setEditingTank(row);
    setModalVisible(true);
  };

  const handleUpdate = async (updatedData: Record<string, any>) => {
    if (editingTank) {
      updateTank(editingTank.TankNumber, updatedData);
      setModalVisible(false);
    }
  };

  const closeEditModal = () => {
    router.replace('/dashboard/lists/tanks-list');
    setShowEditSuccessModal(false);
  };

  const closeDeleteModal = () => {
    router.replace('/dashboard/lists/tanks-list');
    setShowDeleteSuccessModal(false);
  };
  return (
    <CardView title="لیست مخازن">
      {error && <p className="text-red-500">خطا: {error}</p>}

      {showDeleteSuccessModal && (
        <SuccessErrorModal
          isSuccess={true}
          title="حذف مخزن"
          message="مخزن مورد نظر با موفقیت حذف شد"
          onClose={closeDeleteModal}
        />
      )}
      {showEditSuccessModal && (
        <SuccessErrorModal
          isSuccess={true}
          title="ویرایش مخزن"
          message="مخزن مورد نظر با موفقیت ویرایش شد"
          onClose={closeEditModal}
        />
      )}
      <Table
        columns={columns}
        data={tanks}
        itemsPerPage={10}
        actions={(row) => (
          <div className="flex gap-2 justify-center">
            <button
              className="px-2 py-1 bg-yellow-500 rounded text-gray-50"
              onClick={() => handleEditClick(row)}
            >
              ویرایش
            </button>
            <button
              className="px-2 py-1 bg-red-500 rounded text-gray-50"
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

      {confirmModalVisible && (
        <SystemMessageModal
          title="حذف مخزن"
          message="آیا مطمئن هستید که می‌خواهید این مخزن را حذف کنید؟"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmModalVisible(false)}
        />
      )}
    </CardView>
  );
}
