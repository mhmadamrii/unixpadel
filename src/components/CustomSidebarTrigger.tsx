"use client";

import { AlignJustify } from "lucide-react";
import { useSidebar } from "~/components/ui/sidebar";
import { Button } from "./ui/button";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button size="icon" onClick={toggleSidebar}>
      <AlignJustify />
    </Button>
  );
}
