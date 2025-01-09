import { CustomerList } from "~/components/CustomerList";
import { DashboardMetrics } from "~/components/DashboardMetrics";
import { Header } from "~/components/Header";
import { RecentActivities } from "~/components/RecentActivities";
import { SalesPerformance } from "~/components/SalesPerformance";
import { SalesPipeline } from "~/components/SalesPipeline";

export default function Dashboard() {
  return (
    <section className="w-full">
      <Header />
      <section className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="container mx-auto px-6 py-8">
          <h1 className="mb-6 text-3xl font-semibold">Dashboard</h1>
          <DashboardMetrics />
          <div className="mb-6 mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivities />
            </div>
            <CustomerList />
          </div>
          <SalesPerformance />
          {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SalesPipeline />
          </div> */}
        </div>
      </section>
    </section>
  );
}
