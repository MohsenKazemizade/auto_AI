// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '../../actions/sessionActions';
import Sidebar from '../../components/Sidebar';

const Dashboard = async () => {
  const session = await getSession();

  // Redirect to login if the user is not authenticated
  if (!session?.userId) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {session.username}!</p>
        {/* Additional dashboard content goes here */}
      </main>
    </div>
  );
};

export default Dashboard;
