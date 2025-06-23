import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import LoginForm from "./components/Form";
import type { LoginPayload } from "./schemas/login";
import authServices from "@/services/auth";
import { LoadingOverlay } from "@/shared/components/ui/loader";

export default function LoginPage() {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: LoginPayload) =>
      await authServices.login(values),
    onError: (error, variables, context) => {
      console.error("Login failed with error:", error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      console.log("Login successful with data:", data, variables, context);
    },
  });
  const onSubmit = (values: LoginPayload) => mutate(values);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Please log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmitForm={onSubmit} />
        </CardContent>
      </Card>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
