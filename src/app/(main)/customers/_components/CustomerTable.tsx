"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";

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
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    company: "Innovate Inc",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    company: "Design Co",
    status: "Active",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    company: "Music Ltd",
    status: "Active",
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    company: "Film Studios",
    status: "Inactive",
  },
];

export function CustomerTable() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
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
              <TableCell>{customer.status}</TableCell>
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
    </div>
  );
}
