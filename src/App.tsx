import "./App.css";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/components/sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import { DashboardLayout } from "./shared/components/protected";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={<DashboardLayout />}
          children={[<Route path="/" element={<DashboardPage />} />]}
        />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
