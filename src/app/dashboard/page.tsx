// src/app/dashboard/page.tsx
import { getSession } from '../../actions/sessionActions';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await getSession();

  // Redirect to login if the user is not authenticated
  if (!session?.userId) {
    redirect('/login');
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">خانه</h1>
      <section className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
        <div className="grid grid-cols-1 gap-4">
          <a
            href="/dashboard/forms/new-tank"
            className="block p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            مخزن جدید
          </a>
        </div>
      </section>
      <p>More actions and charts will be added here in the future.</p>
    </div>
  );
};

export default Dashboard;
