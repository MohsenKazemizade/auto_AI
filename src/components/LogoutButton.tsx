import { handleLogout } from '@/actions/sessionActions';
import { FaSignOutAlt } from 'react-icons/fa';
interface LogoutButtonProps {
  isExpanded: boolean;
}
const LogoutButton: React.FC<LogoutButtonProps> = ({ isExpanded }) => {
  return (
    <form action={handleLogout}>
      <button className="flex items-center p-5 hover:bg-gray-700 w-full text-right justify-between">
        <span className={`${isExpanded ? 'block' : 'hidden'}`}>خروج</span>
        <FaSignOutAlt size={20} />
      </button>
    </form>
  );
};
export default LogoutButton;
