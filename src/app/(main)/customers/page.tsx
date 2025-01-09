import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CustomerTable } from "./_components/CustomerTable";

export default function Customers() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Customers</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
        <CustomerTable />
      </div>
    </main>
  );
}
