import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import RestorePasswordForm from "./components/restore-form";
import authServices from "@/services/auth";
import type { RestorePayload } from "./schemas/restore-password";
import { LoadingOverlay } from "@/shared/components/loader";
import ToastError from "@/shared/components/toast-error";
import SuccessModal from "./components/success-modal";

export default function ResetPasswordPage() {
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { userId } = params;
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: RestorePayload) =>
      await authServices.restorePassword(values, userId!),
    onError: (error) => ToastError(error),
    onSuccess: () => setVisible(true),
  });

  const handleSubmit = (payload: RestorePayload) => mutate(payload);

  const onDismissModal = () => {
    setVisible(false);
    navigate("/login");
  };

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
      <SuccessModal
        visible={visible}
        onDismiss={onDismissModal}
        isRestore={true}
      />
    </div>
  );
}
