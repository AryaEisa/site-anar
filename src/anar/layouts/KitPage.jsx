import { Outlet } from 'react-router-dom';
import PoweredByBooqy from '../components/PoweredByBooqy';

/** Ram runt kitets flöden (boka, beställ, catering, juridik) på Anars bakgrund. */
export default function KitPage() {
  return (
    <main className="kit-page">
      <div className="kit-panel">
        <Outlet />
        <PoweredByBooqy />
      </div>
    </main>
  );
}
