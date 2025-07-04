import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useParams } from "react-router";
import RestorePasswordForm from "./components/restore-form";
import type { RestorePayload } from "./schemas/restore-password";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth";
import ToastError from "@/shared/components/toast-error";
import { LoadingOverlay } from "@/shared/components/loader";

export default function ResetPasswordPage() {
  const params = useParams();
  const { userId } = params;
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: RestorePayload) =>
      await authServices.restorePassword(values, userId!),
    onError: (error) => ToastError(error),
    onSuccess: () => {},
  });

  const handleSubmit = (payload: RestorePayload) => mutate(payload);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Restore Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter the code you received by email and your new password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestorePasswordForm onSubmitForm={handleSubmit} />
          </CardContent>
        </Card>
      </div>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
