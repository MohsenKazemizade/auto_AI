// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '../../actions/sessionActions';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';
const Dashboard = async () => {
  const session = await getSession();

  // Redirect to login if the user is not authenticated
  if (!session?.userId) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">خانه</h1>
          <section className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/dashboard/forms/new-tank"
                className="block p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                مخزن جدید
              </Link>
            </div>
          </section>
          <p>More actions and charts will be added here in the future.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
