import "./App.css";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "@/shared/components/theme-provider";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "@/shared/components/ui/sonner";
import { ProtectedRoute } from "./shared/components/protected";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import VerifyMFAPage from "./pages/Mfa/Verify";
import SetupMfaPage from "./pages/Mfa/Setup";
import ForgotPassword from "./pages/ForgotPassword/Forgot-Password";
import RestorePassword from "./pages/ForgotPassword/Restore-Password";
import { useAuthRefresh } from "./hooks/use-auth-refresh";

function App() {
  const { mutationErrorHandler, queryErrorHandler } = useAuthRefresh();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0,
      },
    },
    mutationCache: new MutationCache({
      onError: mutationErrorHandler,
    }),
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/restore-password/:userId"
            element={<RestorePassword />}
          />
          <Route
            element={<ProtectedRoute />}
            children={[
              <Route path="/mfa-setup" element={<SetupMfaPage />} />,
              <Route path="/mfa-verify" element={<VerifyMFAPage />} />,
            ]}
          />
          <Route
            element={<ProtectedRoute />}
            children={[<Route path="/" element={<DashboardPage />} />]}
          />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
