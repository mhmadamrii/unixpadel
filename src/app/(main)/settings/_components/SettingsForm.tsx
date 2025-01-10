"use client";

import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/LoadingIndicator";
import { Session } from "next-auth";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function SettingsForm({ session }: { session: Session | null }) {
  const [user, setUser] = useState({
    name: session?.user.name,
    email: session?.user.email,
  });

  const { mutate, isPending } = api.user.editUser.useMutation({
    onSuccess: () => {
      toast.success("Successfully edit user");
    },
  });

  return (
    <Card className="w-full border">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            disabled={isPending}
            // @ts-expect-error
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isPending}
            // @ts-expect-error
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Address</Label>
          <Select disabled={isPending}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select an Address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">Turkey</SelectItem>
              <SelectItem value="fr">German</SelectItem>
              <SelectItem value="de">Egypt</SelectItem>
              <SelectItem value="es">America</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="notifications" />
          <Label htmlFor="notifications">Enable email notifications</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full sm:w-[120px]"
          onClick={() => {
            mutate({
              name: user.name as string,
              email: user.email as string,
            });
          }}
        >
          {isPending ? <Spinner /> : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
