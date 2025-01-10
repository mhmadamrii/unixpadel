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

const time = "2025-01-10T06:14:22.508Z";

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

export function RecentActivities({
  events,
}: {
  events: {
    id: number;
    type: string;
    date: Date;
    sales: string;
    customer: string;
    createdAt: Date;
    note: string;
    amount: number | null;
  }[];
}) {
  function getRelativeTime(inputTime: Date) {
    const now: any = new Date();
    const then: any = new Date(inputTime);
    const diffInSeconds = Math.floor((now - then) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  }
  console.log(events);
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
          {events.slice(0, 4).map((activity) => (
            <li key={activity.id} className="flex items-center justify-between">
              <span>{activity.note}</span>
              <span className="text-sm text-gray-500">
                {getRelativeTime(activity.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
