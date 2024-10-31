// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '../../actions/sessionActions';

const Dashboard = async () => {
  const session = await getSession();

  // Redirect to login if the user is not authenticated
  if (!session?.userId) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session.username}!</p>
      {/* Dashboard content goes here */}
    </div>
  );
};

export default Dashboard;
