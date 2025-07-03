import authServices from "@/services/auth";
import AppSidebar from "@/shared/components/app-sidebar";
import Navbar from "@/shared/components/navbar";
import ToastError from "@/shared/components/toast-error";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => authServices.getUserInfo(),
  });
  const { mutate } = useMutation({
    mutationFn: async () => await authServices.logout(),
    onError: (error) => ToastError(error),
    onSuccess: () => {
      logout();
      window.location.reload();
    },
  });
  const onLogout = () => mutate();
  const logout = useAuthStore((state) => state.logout);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-screen w-full flex flex-col">
        <Navbar onPressLogout={onLogout} user={data?.user} />
      </div>
    </SidebarProvider>
  );
}
