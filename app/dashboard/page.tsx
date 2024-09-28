import { lusitana } from 'app/ui/fonts';
import { fetchLatestInvoices, fetchRevenue } from '../lib/data';
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';

export default async function page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <h1
        className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
      >
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-1 gap6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
