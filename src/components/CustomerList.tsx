import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function CustomerList() {
  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      company: "Tech Corp",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      company: "Innovate Inc",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Brown",
      company: "Design Co",
      status: "Active",
    },
    {
      id: 4,
      name: "Diana Ross",
      company: "Music Ltd",
      status: "Active",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>{customer.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
