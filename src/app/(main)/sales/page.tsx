import { SalesChart } from "~/components/SalesChart";
import { SalesOverview } from "~/components/SalesOverview";
import { TopDeals } from "~/components/TopDeals";

export default function SalesPage() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-6 py-8">
        <h1 className="mb-6 text-3xl font-semibold">Sales Dashboard</h1>
        <SalesOverview />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SalesChart />
          <TopDeals />
        </div>
      </div>
    </main>
  );
}
