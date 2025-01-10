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

export function SalesPerformance({ salesPerformance }: any) {
  console.log(salesPerformance);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesPerformance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalAmount" fill="#8884d8" name="Sales" />
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
            {salesPerformance.slice(0, 5).map((item: any) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.totalAmount.toLocaleString()}</TableCell>
                <TableCell>${item.target.toLocaleString()}</TableCell>
                <TableCell>{item.performance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
