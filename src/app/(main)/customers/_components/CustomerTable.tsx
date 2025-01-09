"use client";

import { Button } from "~/components/ui/button";
import { DeleteCustomer } from "./DeleteCustomer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function CustomerTable() {
  const { data: customersDb = [] } = api.customer.getCustomers.useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customersDb.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
        <Table className="rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>
                  {customer.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <DeleteCustomer id={customer.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
