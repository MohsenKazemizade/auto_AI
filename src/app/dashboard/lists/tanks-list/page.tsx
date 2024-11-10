import { getTanks } from '@/actions/tankActions';
import TanksList from '@/components/lists/TanksList';

export default async function TanksListPage() {
  const tanks = await getTanks();

  return (
    <div>
      <TanksList tanks={tanks} />
    </div>
  );
}
