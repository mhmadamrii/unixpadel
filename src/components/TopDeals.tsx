"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

const topDeals = [
  {
    id: 1,
    customer: "Acme Corp",
    value: 50000,
    status: "In Progress",
    sales_name: "John Doe",
  },
  {
    id: 2,
    customer: "Globex Corporation",
    value: 75000,
    status: "Closed",
    sales_name: "John Doe",
  },
  {
    id: 3,
    customer: "Soylent Corp",
    value: 100000,
    status: "Negotiation",
    sales_name: "John Doe",
  },
  {
    id: 4,
    customer: "Initech",
    value: 65000,
    status: "Proposal",
    sales_name: "John Doe",
  },
  {
    id: 5,
    customer: "Umbrella Corporation",
    value: 90000,
    status: "Qualified",
    sales_name: "John Doe",
  },
];

export function TopDeals() {
  const { data } = api.sales.getTopDeals.useQuery();
  console.log("data", data);
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
              <TableHead>Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.slice(0, 5).map((deal) => (
              <TableRow key={deal.id}>
                <TableCell>{deal.customer}</TableCell>
                <TableCell>${deal?.amount?.toLocaleString()}</TableCell>
                <TableCell>
                  {deal.amount == 0 ? "In Progress" : "Negotiation"}
                </TableCell>
                <TableCell>{deal.Sales?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
