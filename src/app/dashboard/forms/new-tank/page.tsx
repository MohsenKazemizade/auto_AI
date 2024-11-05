// src/app/dashboard/forms/new-tank.tsx
import React from 'react';
import NewTankForm from '../../../../components/forms/NewTankForm';

const NewTankPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مخزن جدید</h1>
      <NewTankForm />
    </div>
  );
};

export default NewTankPage;
