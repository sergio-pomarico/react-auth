import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
