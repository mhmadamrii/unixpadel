import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const topDeals = [
  {
    id: 1,
    customer: "Acme Corp",
    value: 50000,
    status: "In Progress",
  },
  {
    id: 2,
    customer: "Globex Corporation",
    value: 75000,
    status: "Closed",
  },
  {
    id: 3,
    customer: "Soylent Corp",
    value: 100000,
    status: "Negotiation",
  },
  {
    id: 4,
    customer: "Initech",
    value: 65000,
    status: "Proposal",
  },
  {
    id: 5,
    customer: "Umbrella Corporation",
    value: 90000,
    status: "Qualified",
  },
];

export function TopDeals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDeals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell>{deal.customer}</TableCell>
                <TableCell>${deal.value.toLocaleString()}</TableCell>
                <TableCell>{deal.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
