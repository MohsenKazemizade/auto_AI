'use client';
import React, { useState, useEffect } from 'react';
import CardView from '../CardView';
import { handleSubmitNewTank } from '../../actions/tankActions';
import { useSearchParams } from 'next/navigation';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Icon from 'react-multi-date-picker/components/icon';
import SuccessErrorModal from '../modals/SuccessErrorModal';
import { FaTimes } from 'react-icons/fa';

const NewTankForm: React.FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [tankOwner, setTankOwner] = useState('');
  const [tankNumber, setTankNumber] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [driverFullName, setDriverFullName] = useState('');
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('');
  const [driverLisenceNumber, setDriverLisenceNumber] = useState('');
  const [truckPlateNumber, setTruckPlateNumber] = useState('');
  const [truckTransitNumber, setTruckTransitNumber] = useState('');
  const [truckCaputageCompany, setTruckCaputageCompany] = useState('');
  const [psiTest, setPsiTest] = useState('');
  const [whiteTest, setWhiteTest] = useState('');

  const resetForm = () => {
    setTankOwner('');
    setTankNumber('');
    setSupervisor('');
    setDriverFullName('');
    setDriverPhoneNumber('');
    setDriverLisenceNumber('');
    setTruckPlateNumber('');
    setTruckTransitNumber('');
    setTruckCaputageCompany('');
    setPsiTest('');
    setWhiteTest('');
  };

  useEffect(() => {
    if (success) {
      setShowSuccessModal(true);
      resetForm();
    }
  }, [success]);

  const clearPsiTest = () => {
    setPsiTest('');
  };

  const clearWhiteTest = () => {
    setWhiteTest('');
  };

  return (
    <form className="flex flex-col gap-4" action={handleSubmitNewTank}>
      {error && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
          {decodeURIComponent(error)}
        </div>
      )}

      <CardView title="مخزن">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="TankOwner"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              صاحب مخزن <span className="text-red-500">*</span>{' '}
            </label>
            <input
              type="text"
              id="TankOwner"
              name="TankOwner"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={tankOwner}
              onChange={(e) => setTankOwner(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="TankNumber"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              شماره مخزن <span className="text-red-500">*</span>{' '}
            </label>
            <input
              type="text"
              id="TankNumber"
              name="TankNumber"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={tankNumber}
              onChange={(e) => setTankNumber(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Supervisor"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              کرییر
            </label>
            <input
              type="text"
              id="Supervisor"
              name="Supervisor"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
            />
          </div>

          <div className="col-span-1 flex items-center gap-1">
            <label
              htmlFor="PsiTest"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              تست psi
            </label>
            <input
              type="text"
              id="PsiTest"
              name="PsiTest"
              className="mt-1 block w-full border border-gray-300 rounded-md text-right dark:text-gray-800"
              value={psiTest}
              readOnly
            />
            <div className="relative">
              {psiTest && (
                <button
                  onClick={clearPsiTest}
                  className="px-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="flex flex-row ml-1 items-center text-gray-800 dark:text-gray-200">
              <DatePicker
                render={<Icon />}
                onChange={(date) => {
                  if (date) {
                    setPsiTest(new DateObject(date).format('YYYY/MM/DD'));
                  } else {
                    setPsiTest('');
                  }
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-center"
              />
            </div>
          </div>

          <div className="col-span-1 flex items-center gap-1">
            <label
              htmlFor="WhiteTest"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              تست سفید
            </label>
            <input
              type="text"
              id="WhiteTest"
              name="WhiteTest"
              className="mt-1 block w-full border border-gray-300 rounded-md text-right dark:text-gray-800"
              value={whiteTest}
              readOnly
            />
            <div className="relative">
              {whiteTest && (
                <button
                  onClick={clearWhiteTest}
                  className="px-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="flex flex-row ml-1 items-center text-gray-800 dark:text-gray-200">
              <DatePicker
                render={<Icon />}
                onChange={(date) => {
                  if (date) {
                    setWhiteTest(new DateObject(date).format('YYYY/MM/DD'));
                  } else {
                    setWhiteTest('');
                  }
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-center"
              />
            </div>
          </div>
        </div>
      </CardView>

      <CardView title="راننده">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="DriverFullName"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200 "
            >
              راننده
            </label>
            <input
              type="text"
              id="DriverFullName"
              name="DriverFullName"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={driverFullName}
              onChange={(e) => setDriverFullName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="DriverPhoneNumber"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              شماره تماس راننده
            </label>
            <input
              dir="ltr"
              type="number"
              id="DriverPhoneNumber"
              name="DriverPhoneNumber"
              className=" mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={driverPhoneNumber}
              onChange={(e) => setDriverPhoneNumber(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="DriverLisenceNumber"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              شماره گواهینامه راننده
            </label>
            <input
              type="text"
              id="DriverLisenceNumber"
              name="DriverLisenceNumber"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={driverLisenceNumber}
              onChange={(e) => setDriverLisenceNumber(e.target.value)}
            />
          </div>
        </div>
      </CardView>

      <CardView title="کشنده">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="TruckPlateNumber"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              شماره شهربانی
            </label>
            <input
              type="text"
              id="TruckPlateNumber"
              name="TruckPlateNumber"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={truckPlateNumber}
              onChange={(e) => setTruckPlateNumber(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="TruckTransitNumber"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              پلاک ترانزیت
            </label>
            <input
              type="text"
              id="TruckTransitNumber"
              name="TruckTransitNumber"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={truckTransitNumber}
              onChange={(e) => setTruckTransitNumber(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="TruckCaputageCompany"
              className="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              کاپوتاژ
            </label>
            <input
              type="text"
              id="TruckCaputageCompany"
              name="TruckCaputageCompany"
              className="mt-1 block w-full border border-gray-300 rounded-md text-left dark:text-gray-800"
              value={truckCaputageCompany}
              onChange={(e) => setTruckCaputageCompany(e.target.value)}
            />
          </div>
        </div>
      </CardView>

      <div className="col-span-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-custom"
        >
          ثبت
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessErrorModal
          title=""
          message="مخزن جدید با موفقیت ثبت شد"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </form>
  );
};

export default NewTankForm;
