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

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const salesData = [
  { name: "Alice Johnson", sales: 45000, target: 50000 },
  { name: "Bob Smith", sales: 53000, target: 50000 },
  { name: "Charlie Davis", sales: 58000, target: 55000 },
  { name: "Diana Wilson", sales: 38000, target: 45000 },
  { name: "Eva Brown", sales: 61000, target: 60000 },
];

export function SalesPerformance() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="target" fill="#82ca9d" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.sales.toLocaleString()}</TableCell>
                <TableCell>${item.target.toLocaleString()}</TableCell>
                <TableCell>
                  {((item.sales / item.target) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
