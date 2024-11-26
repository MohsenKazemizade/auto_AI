'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getSession } from '../actions/sessionActions';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();
interface TankResponse {
  ID: string;
  TankNumber: string;
  TankOwner: string;
  TruckPlateNumber: string | null;
  TruckTransitNumber: string | null;
  TruckCaputageCompany: string | null;
  DriverFullName: string | null;
  DriverLisenceNumber: string | null;
  DriverPhoneNumber: string | null;
  PsiTest: string | null;
  WhiteTest: string | null;
  Supervisor: string | null;
  Creator: string;
  SubmitDateTime: string;
}
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
// Fetch all tanks from the database
export const getTanks = async (): Promise<TankResponse[]> => {
  const tanks = await prisma.tanks.findMany({
    orderBy: { SubmitDateTime: 'desc' }, // Sort by submission date, newest first
  });

  return tanks.map((tank) => ({
    ID: tank.ID.toString(),
    TankNumber: tank.TankNumber,
    TankOwner: tank.TankOwner,
    TruckPlateNumber: tank.TruckPlateNumber || null,
    TruckTransitNumber: tank.TruckTransitNumber || null,
    TruckCaputageCompany: tank.TruckCaputageCompany || null,
    DriverFullName: tank.DriverFullName || null,
    DriverLisenceNumber: tank.DriverLisenceNumber || null,
    DriverPhoneNumber: tank.DriverPhoneNumber || null,
    PsiTest: tank.PsiTest ? tank.PsiTest.toISOString() : null, // Convert DateTime to ISO string
    WhiteTest: tank.WhiteTest ? tank.WhiteTest.toISOString() : null,
    Supervisor: tank.Supervisor || null,
    Creator: tank.Creator,
    SubmitDateTime: tank.SubmitDateTime.toISOString(),
  }));
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
  // const safeGetInt = (value: FormDataEntryValue | null) =>
  //   value && !isNaN(parseInt(value.toString()))
  //     ? parseInt(value.toString())
  //     : null;

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
    DriverPhoneNumber: safeGetString(formData.get('DriverPhoneNumber')),
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

  try {
    // Try creating the new tank
    await prisma.tanks.create({
      data,
    });
    redirect('/dashboard/forms/new-tank?success=true');
  } catch (error) {
    // Handle the uniqueness constraint error
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = error.meta?.target as string[] | string | undefined;
      if (
        target &&
        typeof target === 'string' &&
        target.includes('TankNumber')
      ) {
        const errorMessage = encodeURIComponent(
          'این شماره مخزن قبلا ثبت شده است'
        );
        redirect(`/dashboard/forms/new-tank?error=${errorMessage}`);
      }
    } else {
      console.error('Unexpected error:', error);
      const errorMessage = encodeURIComponent(
        'خطایی رخ داد، لطفا مجددا تلاش کنید'
      );
      redirect(`/dashboard/forms/new-tank?error=${errorMessage}`);
    }
  }
};

export const deleteTank = async (TankNumber: string) => {
  const session = await getSession();

  if (!session || !session.username) {
    const errorMessage = encodeURIComponent(
      'ورود شما منقضی شده است لطفا دوباره وارد شوید'
    );
    redirect(`/login?error=${errorMessage}`);
    return;
  }

  const tank = await prisma.tanks.findUnique({
    where: { TankNumber },
  });

  if (!tank) {
    const errorMessage = encodeURIComponent('مخزن یافت نشد');
    redirect(`/dashboard/lists/tanks-list?error=${errorMessage}`);
    return;
  }

  await prisma.tanks.delete({
    where: { TankNumber },
  });

  redirect(`/dashboard/lists/tanks-list?deleteSuccess=true`);
};

export const updateTank = async (
  TankNumber: string,
  updatedData: Record<string, any>
) => {
  const session = await getSession();

  if (!session || !session.username) {
    const errorMessage = encodeURIComponent(
      'ورود شما منقضی شده است لطفا دوباره وارد شوید'
    );
    redirect(`/login?error=${errorMessage}`);
    return;
  }

  const safeGetString = (value: any) =>
    value !== null && value !== undefined ? String(value) : '';

  const data = {
    TankOwner: safeGetString(updatedData.TankOwner),
    TruckPlateNumber: safeGetString(updatedData.TruckPlateNumber),
    TruckTransitNumber: safeGetString(updatedData.TruckTransitNumber),
    TruckCaputageCompany: safeGetString(updatedData.TruckCaputageCompany),
    DriverFullName: safeGetString(updatedData.DriverFullName),
    DriverLisenceNumber: safeGetString(updatedData.DriverLisenceNumber),
    DriverPhoneNumber: safeGetString(updatedData.DriverPhoneNumber),
    PsiTest: parsePersianDate(safeGetString(updatedData.PsiTest)),
    WhiteTest: parsePersianDate(safeGetString(updatedData.WhiteTest)),
    Supervisor: safeGetString(updatedData.Supervisor),
  };

  await prisma.tanks.update({
    where: { TankNumber },
    data,
  });

  redirect(`/dashboard/lists/tanks-list?editSuccess=true`);
};
