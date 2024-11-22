import { handleLogout } from '@/actions/sessionActions';
import { FaSignOutAlt } from 'react-icons/fa';
// interface LogoutButtonProps {
//   isSidebarExpanded: boolean;
// }
const LogoutButton: React.FC = () => {
  return (
    <form action={handleLogout}>
      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer w-full">
        <FaSignOutAlt />
        <span>خروج</span>
      </button>
    </form>
  );
};
export default LogoutButton;
