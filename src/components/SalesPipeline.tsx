import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

export function SalesPipeline() {
  const stages = [
    {
      name: "Leads",
      value: 120,
      percentage: 100,
    },
    {
      name: "Qualified",
      value: 80,
      percentage: 67,
    },
    {
      name: "Proposal",
      value: 40,
      percentage: 33,
    },
    {
      name: "Negotiation",
      value: 20,
      percentage: 17,
    },
    {
      name: "Closed",
      value: 10,
      percentage: 8,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        {stages.map((stage) => (
          <div key={stage.name} className="mb-4">
            <div className="mb-1 flex justify-between">
              <span>{stage.name}</span>
              <span>{stage.value}</span>
            </div>
            <Progress value={stage.percentage} className="w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
