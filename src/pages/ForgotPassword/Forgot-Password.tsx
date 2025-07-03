import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import ForgotPasswordForm from "./components/Forgot-form";
import { useMutation } from "@tanstack/react-query";
import ToastError from "@/shared/components/toast-error";
import authServices from "@/services/auth";
import { LoadingOverlay } from "@/shared/components/loader";

export default function ForgotPasswordPage() {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: string) =>
      await authServices.forgotPassword(values),
    onError: (error) => ToastError(error),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleSubmit = (email: string) => {
    mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <a
                href="/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Go back to login
              </a>
            </div>
            <CardTitle className="text-2xl font-bold">
              Forgot your password?
            </CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a recovery code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm onSubmitForm={handleSubmit} />
          </CardContent>
        </Card>
      </div>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
