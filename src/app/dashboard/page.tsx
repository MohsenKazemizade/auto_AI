// src/app/dashboard/page.tsx
import { getSession } from '../../actions/sessionActions';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Dashboard = async () => {
  const session = await getSession();

  // Redirect to login if the user is not authenticated
  if (!session?.userId) {
    redirect('/login');
  }

  // Fetch the total tank count from the database
  const tankCount = await prisma.tanks.count();
  // const monthlyIncrease = 2541; // Static number for demo, replace with your logic

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">خانه</h1>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            مخازن جدید
          </h2>
          <div className="flex items-center justify-between mt-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {tankCount.toLocaleString()}
            </div>
            <div className="relative w-12 h-12">
              {/* <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-300 dark:text-gray-600"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 1 0 0.00001 0"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${Math.min(
                    (monthlyIncrease / tankCount) * 100,
                    100
                  )}, 100`}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 1 0 0.00001 0"
                />
              </svg> */}
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            {/* <span className="mr-1 text-xs bg-green-100 px-2 py-1 rounded">
              +{monthlyIncrease.toLocaleString()}
            </span> */}
            در این ماه
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
