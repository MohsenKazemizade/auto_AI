'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export const handleSubmitNewTank = async (formData: FormData) => {
  try {
    // Extract and parse form data, ensuring non-nullable values are correctly assigned
    const data = {
      TruckID: (formData.get('truckID') as string) || '',
      DriverID: (formData.get('driverID') as string) || '',
      TankOwner: (formData.get('tankOwner') as string) || '',
      TankNumber: (formData.get('tankNumber') as string) || '',
      TankSerialNumber: formData.get('tankSerialNumber') as string,
      TankChassisNumber: formData.get('tankChassisNumber') as string,
      EmployerCompany: formData.get('employerCompany') as string,
      PSITest: formData.get('psiTest') === 'true',
      PSITestDate: new Date(formData.get('psiTestDate') as string),
      PsiSealNumber: formData.get('psiSealNumber') as string,
      WhiteTest: formData.get('whiteTest') === 'true',
      WhiteTestDate: new Date(formData.get('whiteTestDate') as string),
      TankAxleType: formData.get('tankAxleType') as string,
      AirValve: formData.get('airValve') === 'true',
      DriversSideOfMiddleAndLastAxisABSSensor:
        formData.get('driversSideABSSensor') === 'true',
      TheRightSideOfTheMiddleAndLastAxisABSSensor:
        formData.get('rightSideABSSensor') === 'true',
      ValveHandle: formData.get('valveHandle') === 'true',
      JackHandle: formData.get('jackHandle') === 'true',
      FireBox: formData.get('fireBox') === 'true',
      Refrigerator: formData.get('refrigerator') === 'true',
      Toolbox: formData.get('toolbox') === 'true',
      JackBottomLayer: formData.get('jackBottomLayer') === 'true',
      JackAxis: formData.get('jackAxis') === 'true',
      LiftAxle: formData.get('liftAxle') === 'true',
      DrawerInsideTheToolBox: formData.get('drawerInsideToolbox') === 'true',
      LongitudinalSideHazardLight:
        formData.get('longitudinalHazardLight') === 'true',
      RearHazardLight: formData.get('rearHazardLight') === 'true',
      Wiring: formData.get('wiring') === 'true',
      BumperShieldGuard: formData.get('bumperShieldGuard') === 'true',
      ABSDevice: formData.get('absDevice') === 'true',
      ABSSerial: (formData.get('absSerial') as string) || '',
      WindBag: formData.get('windBag') === 'true',
      MammoottySideLight: formData.get('mammoottySideLight') === 'true',
      ReflectiveSheet: formData.get('reflectiveSheet') === 'true',
      WaterTank: formData.get('waterTank') === 'true',
      WaterTankCondition: (formData.get('waterTankCondition') as string) || '',
      WaterTankType: (formData.get('waterTankType') as string) || '',
      WaterTankValve: formData.get('waterTankValve') === 'true',
      WaterTankLid: formData.get('waterTankLid') === 'true',
      ParkLockBoxAndWindAdjustmentHandle:
        formData.get('parkLockBoxAndWindAdjustmentHandle') === 'true',
      PipeValveHead: formData.get('pipeValveHead') === 'true',
      NumberOfBrassCaps: (formData.get('numberOfBrassCaps') as string) || '',
      CapsCondition: (formData.get('capsCondition') as string) || '',
      RoundBottom: formData.get('roundBottom') === 'true',
      KitCondition: (formData.get('kitCondition') as string) || '',
      TiresSerialNumbers: JSON.parse(
        (formData.get('tiresSerialNumbers') as string) || '[]'
      ),
      TiresBrand: JSON.parse((formData.get('tiresBrand') as string) || '[]'),
      TiresCapacityOnTheDriverSide: JSON.parse(
        (formData.get('tiresCapacityDriverSide') as string) || '[]'
      ),
      TiresCapacityOnThePassengerSide: JSON.parse(
        (formData.get('tiresCapacityPassengerSide') as string) || '[]'
      ),
      RimTypeOnTheDriverSide: JSON.parse(
        (formData.get('rimTypeDriverSide') as string) || '[]'
      ),
      RimTypeOnThePassengerSide: JSON.parse(
        (formData.get('rimTypePassengerSide') as string) || '[]'
      ),
      FenderOnTheDriverSide: (formData.get('fenderDriverSide') as string) || '',
      FenderOnThePassengerSide:
        (formData.get('fenderPassengerSide') as string) || '',
      SlackerOnTheDriverSide:
        (formData.get('slackerDriverSide') as string) || '',
      SlackerOnThePassengerSide:
        (formData.get('slackerPassengerSide') as string) || '',
      BalloonStatusOnThePassengerSide: JSON.parse(
        (formData.get('balloonStatusPassengerSide') as string) || '[]'
      ),
      BalloonStatusOnTheDriverSide: JSON.parse(
        (formData.get('balloonStatusDriverSide') as string) || '[]'
      ),
      Barometer: (formData.get('barometer') as string) || '',
      AirLoadingAndUnloadingPipe:
        (formData.get('airLoadingAndUnloadingPipe') as string) || '',
      Fitting: (formData.get('fitting') as string) || '',
      TankBrakeType: (formData.get('tankBrakeType') as string) || '',
      SideWritten: (formData.get('sideWritten') as string) || '',
      Active: (formData.get('active') as string) || '',
      TankLocation: (formData.get('tankLocation') as string) || '',
      TankStatus: (formData.get('tankStatus') as string) || '',
      UnderRepair: (formData.get('underRepair') as string) || '',
      FaucetsCondition: (formData.get('faucetsCondition') as string) || '',
      Testing: (formData.get('testing') as string) || '',
      GPS: (formData.get('gps') as string) || '',
      GPSUserName: (formData.get('gpsUserName') as string) || '',
      GPSPassword: (formData.get('gpsPassword') as string) || '',
      GPSWebSite: (formData.get('gpsWebSite') as string) || '',
      GPSAPI: (formData.get('gpsAPI') as string) || '',
      TankConstructionYearModel:
        (formData.get('tankConstructionYearModel') as string) || '',
      Supervisor: BigInt(formData.get('supervisor') as string),
      SubmitDate: new Date(formData.get('submitDate') as string),
      RepresentativeCode: (formData.get('representativeCode') as string) || '',
    };

    // Create a new record in the `tanks` table
    await prisma.tank.create({ data });

    // Redirect after successful creation
    redirect('/dashboard');
  } catch (error) {
    const errorMessage = encodeURIComponent(
      'An error occurred while creating the tank.'
    );
    console.error('Error creating tank record:', error);
    redirect(`/dashboard/new?error=${errorMessage}`);
  }
};
