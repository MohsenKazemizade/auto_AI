'use client';
import React from 'react';
import { handleSubmitNewTank } from '../../actions/tankActions';
import { useSearchParams } from 'next/navigation';

const NewTankForm: React.FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <form action={handleSubmitNewTank} method="post" className="space-y-4">
      {error && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">
          {decodeURIComponent(error)}
        </div>
      )}

      <div>
        <label htmlFor="truckID" className="block text-sm font-medium">
          Truck ID
        </label>
        <input
          type="text"
          id="truckID"
          name="truckID"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="driverID" className="block text-sm font-medium">
          Driver ID
        </label>
        <input
          type="text"
          id="driverID"
          name="driverID"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="tankOwner" className="block text-sm font-medium">
          Tank Owner
        </label>
        <input
          type="text"
          id="tankOwner"
          name="tankOwner"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="tankNumber" className="block text-sm font-medium">
          Tank Number
        </label>
        <input
          type="text"
          id="tankNumber"
          name="tankNumber"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="tankSerialNumber" className="block text-sm font-medium">
          Tank Serial Number
        </label>
        <input
          type="text"
          id="tankSerialNumber"
          name="tankSerialNumber"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="tankChassisNumber"
          className="block text-sm font-medium"
        >
          Tank Chassis Number
        </label>
        <input
          type="text"
          id="tankChassisNumber"
          name="tankChassisNumber"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="employerCompany" className="block text-sm font-medium">
          Employer Company
        </label>
        <input
          type="text"
          id="employerCompany"
          name="employerCompany"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="psiTest" className="block text-sm font-medium">
          PSI Test
        </label>
        <select
          id="psiTest"
          name="psiTest"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="psiTestDate" className="block text-sm font-medium">
          PSI Test Date
        </label>
        <input
          type="date"
          id="psiTestDate"
          name="psiTestDate"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="psiSealNumber" className="block text-sm font-medium">
          PSI Seal Number
        </label>
        <input
          type="text"
          id="psiSealNumber"
          name="psiSealNumber"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="whiteTest" className="block text-sm font-medium">
          White Test
        </label>
        <select
          id="whiteTest"
          name="whiteTest"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="whiteTestDate" className="block text-sm font-medium">
          White Test Date
        </label>
        <input
          type="date"
          id="whiteTestDate"
          name="whiteTestDate"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="tankAxleType" className="block text-sm font-medium">
          Tank Axle Type
        </label>
        <input
          type="text"
          id="tankAxleType"
          name="tankAxleType"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="airValve" className="block text-sm font-medium">
          Air Valve
        </label>
        <select
          id="airValve"
          name="airValve"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="driversSideABSSensor"
          className="block text-sm font-medium"
        >
          Driver&apos;s Side ABS Sensor
        </label>
        <select
          id="driversSideABSSensor"
          name="driversSideABSSensor"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="rightSideABSSensor"
          className="block text-sm font-medium"
        >
          Right Side ABS Sensor
        </label>
        <select
          id="rightSideABSSensor"
          name="rightSideABSSensor"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="valveHandle" className="block text-sm font-medium">
          Valve Handle
        </label>
        <select
          id="valveHandle"
          name="valveHandle"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="jackHandle" className="block text-sm font-medium">
          Jack Handle
        </label>
        <select
          id="jackHandle"
          name="jackHandle"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Repeat the same structure for all remaining fields in the Tank model */}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default NewTankForm;
