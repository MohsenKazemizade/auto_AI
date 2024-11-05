'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getSession } from '../actions/sessionActions';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const prisma = new PrismaClient();

// Helper function to convert Persian date string to JavaScript Date object or return null if empty
const parsePersianDate = (dateString: string): Date | null => {
  if (!dateString || dateString.trim() === '') return null;
  const dateObject = new DateObject({
    date: dateString,
    format: 'YYYY/MM/DD',
    calendar: persian,
    locale: persian_fa,
  });
  return dateObject.toDate();
};

export const handleSubmitNewTank = async (formData: FormData) => {
  const session = await getSession();

  if (!session || !session.username) {
    const errorMessage = encodeURIComponent(
      'ورود شما منقضی شده است لطفا دوباره وارد شوید'
    );
    redirect(`/login?error=${errorMessage}`);
    return;
  }
  const safeGetInt = (value: FormDataEntryValue | null) =>
    value && !isNaN(parseInt(value.toString()))
      ? parseInt(value.toString())
      : null;

  const safeGetString = (value: FormDataEntryValue | null) =>
    value ? String(value) : '';

  const data = {
    TankNumber: safeGetString(formData.get('TankNumber')),
    TankOwner: safeGetString(formData.get('TankOwner')),
    TruckPlateNumber: safeGetString(formData.get('TruckPlateNumber')),
    TruckTransitNumber: safeGetString(formData.get('TruckTransitNumber')),
    TruckCaputageCompany: safeGetString(formData.get('TruckCaputageCompany')),
    DriverFullName: safeGetString(formData.get('DriverFullName')),
    DriverLisenceNumber: safeGetString(formData.get('DriverLisenceNumber')),
    DriverPhoneNumber: safeGetInt(formData.get('DriverPhoneNumber')),
    PsiTest: parsePersianDate(safeGetString(formData.get('PsiTest'))),
    WhiteTest: parsePersianDate(safeGetString(formData.get('WhiteTest'))),
    Supervisor: safeGetString(formData.get('Supervisor')),
    Creator: session.username,
    SubmitDateTime: new Date(),
  };

  if (!data.TankNumber || !data.TankOwner) {
    const errorMessage = encodeURIComponent('موارد ستاره دار شده الزامیست');
    redirect(`/dashboard/forms/new-tank?error=${errorMessage}`);
    return;
  }

  const existingTank = await prisma.tanks.findUnique({
    where: { TankNumber: data.TankNumber },
  });

  if (!existingTank) {
    await prisma.tanks.create({ data });
    redirect('/dashboard/forms/new-tank?success=true');
  } else {
    const errorMessage = encodeURIComponent('این شماره مخزن قبلا ثبت شده است');
    redirect(`/dashboard/forms/new-tank?error=${errorMessage}`);
  }
};
