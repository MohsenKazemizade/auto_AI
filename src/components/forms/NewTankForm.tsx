'use client';
import React from 'react';
import CardView from '../CardView'; // Ensure the path to CardView is correct
import { handleSubmitNewTank } from '../../actions/tankActions';
import { useSearchParams } from 'next/navigation';

const NewTankForm: React.FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <CardView title="Create New Tank">
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

        {/* Repeat similar structure for remaining fields in your Tank model */}
        {/* Ensure to include all required fields for creating a new tank */}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </CardView>
  );
};

export default NewTankForm;
