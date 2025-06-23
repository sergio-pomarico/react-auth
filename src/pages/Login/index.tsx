import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import type { LoginPayload } from "./schemas/login";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router";
import { LoadingOverlay } from "@/shared/components/loader";

import LoginForm from "./components/Form";
import authServices from "@/services/auth";
import ToastError from "@/shared/components/toast-error";

export default function LoginPage() {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: LoginPayload) =>
      await authServices.login(values),
    onError: (error) => ToastError(error),
    onSuccess: (data) => {
      const { credentials } = data;
      login(credentials.accessToken);
      navigate("/");
    },
  });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (values: LoginPayload) => mutate(values);
  const goToForgotPassword = () => navigate("/forgot-password");
  const goToRegister = () => navigate("/register");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            onSubmitForm={onSubmit}
            onForgotPassword={goToForgotPassword}
            onRegister={goToRegister}
          />
        </CardContent>
      </Card>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
