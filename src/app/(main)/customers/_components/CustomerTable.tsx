"use client";

import { Button } from "~/components/ui/button";
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

const initialCustomers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    company: "Tech Corp",
    isActive: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    company: "Innovate Inc",
    isActive: false,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    company: "Design Co",
    isActive: true,
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    company: "Music Ltd",
    isActive: true,
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    company: "Film Studios",
    isActive: false,
  },
];

export function CustomerTable() {
  const { data: customersDb = [] } = api.customer.getCustomers.useQuery();
  const [customers, setCustomers] = useState([
    ...initialCustomers,
    ...customersDb,
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setCustomers([...initialCustomers, ...customersDb]);
  }, [customersDb]);

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
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
