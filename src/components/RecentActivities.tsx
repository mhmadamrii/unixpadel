"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const activities = [
  {
    id: 1,
    description: "John Doe added a new contact",
    time: "2 hours ago",
  },
  {
    id: 2,
    description: "Sarah Smith closed a deal",
    time: "4 hours ago",
  },
  {
    id: 3,
    description: "New lead assigned to Mike Johnson",
    time: "Yesterday",
  },
  {
    id: 4,
    description: "Team meeting scheduled for next week",
    time: "2 days ago",
  },
];

const activityData = [
  {
    name: "Mon",
    activities: 3,
  },
  {
    name: "Tue",
    activities: 7,
  },
  {
    name: "Wed",
    activities: 5,
  },
  {
    name: "Thu",
    activities: 8,
  },
  {
    name: "Fri",
    activities: 12,
  },
  {
    name: "Sat",
    activities: 4,
  },
  {
    name: "Sun",
    activities: 6,
  },
];

export function RecentActivities() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="activities" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-4 space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between">
              <span>{activity.description}</span>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
