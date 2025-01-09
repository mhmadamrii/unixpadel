import { Bell, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomTrigger } from "./CustomSidebarTrigger";

export function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
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
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
