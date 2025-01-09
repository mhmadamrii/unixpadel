import { SalesChart } from "~/components/SalesChart";
import { SalesOverview } from "~/components/SalesOverview";
import { TopDeals } from "~/components/TopDeals";
import { FormSales } from "./_components/FormSales";

export default function Sales() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Sales</h1>
          <FormSales />
        </div>
        <SalesOverview />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SalesChart />
          <TopDeals />
        </div>
      </div>
    </main>
  );
}
