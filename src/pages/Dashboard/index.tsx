import AppSidebar from "@/shared/components/app-sidebar";
import Navbar from "@/shared/components/navbar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-screen w-full flex flex-col">
        <Navbar />
      </div>
    </SidebarProvider>
  );
}
