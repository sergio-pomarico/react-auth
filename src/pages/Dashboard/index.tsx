import authServices from "@/services/auth";
import AppSidebar from "@/shared/components/app-sidebar";
import Navbar from "@/shared/components/navbar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => authServices.getUserInfo(),
  });
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-screen w-full flex flex-col">
        <Navbar />
      </div>
    </SidebarProvider>
  );
}
