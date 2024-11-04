// src/app/dashboard/layout.tsx
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { SidebarProvider } from '../../contexts/SidebarContext';
import { getSession } from '../../actions/sessionActions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard',
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  // Redirect to login if the user is not authenticated
  if (!session?.userId) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header
            username={session.username || 'Guest'}
            accessLevel={session.accesslevel || 'Unknown'}
            profilePictureUrl="/images/admin-profile-picture.png" // Replace with actual image path or dynamic URL
            notificationCount={3} // Replace with actual notification count logic
          />
          <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-800">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
