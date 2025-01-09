"use client";

import Link from "next/link";

import { Bell, Search, User } from "lucide-react";
import { ModeToggle } from "./ui/theme-toggle";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomTrigger } from "./CustomSidebarTrigger";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CustomTrigger />
            <div>
              <h1 className="text-xl font-bold">Unixpadel</h1>
            </div>
            <Input type="search" placeholder="Search..." className="w-64" />
            <Button size="icon" className="ml-2">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <div className="flex items-center">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
