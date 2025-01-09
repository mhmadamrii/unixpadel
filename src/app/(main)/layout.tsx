import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/AppSidebar";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);

  if (!session) {
    redirect("/auth");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
