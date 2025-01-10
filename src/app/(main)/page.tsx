import { Suspense } from "react";
import { CustomerList } from "~/components/CustomerList";
import { DashboardMetrics } from "~/components/DashboardMetrics";
import { DashboardSkeleton } from "~/components/DashboardSkeleton";
import { RecentActivities } from "~/components/RecentActivities";
import { SalesPerformance } from "~/components/SalesPerformance";
import { api } from "~/trpc/server";

async function DashboardWithData() {
  const dashboardData = await api.dashboard.getDashboardData();
  return (
    <>
      <DashboardMetrics
        revenue={dashboardData.sales.reduce(
          (sum, item) => sum + (item.totalAmount || 0),
          0,
        )}
        totalCustomers={dashboardData.customers.length}
      />
      <div className="mb-6 mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivities events={dashboardData?.recentActivities ?? []} />
        </div>
        <CustomerList customers={dashboardData?.customers ?? []} />
      </div>
      <SalesPerformance salesPerformance={dashboardData?.sales ?? []} />
    </>
  );
}

export default function Dashboard() {
  return (
    <section className="w-full">
      <section className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="container mx-auto px-6 py-8">
          <h1 className="mb-6 text-3xl font-semibold">Dashboard</h1>
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardWithData />
          </Suspense>
        </div>
      </section>
    </section>
  );
}
