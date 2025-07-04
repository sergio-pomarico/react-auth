import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Link } from "react-router";

import { useNavigate } from "react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoadingOverlay } from "@/shared/components/loader";

import ToastError from "@/shared/components/toast-error";
import authServices from "@/services/auth";
import SuccessModal from "./components/success-modal";
import ForgotPasswordForm from "./components/forgot-form";

export default function ForgotPasswordPage() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: string) =>
      await authServices.forgotPassword(values),
    onError: (error) => ToastError(error),
    onSuccess: () => setVisible(true),
  });

  const handleSubmit = (email: string) => {
    mutate(email);
  };

  const onDismissModal = () => {
    setVisible(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Go back to login
              </Link>
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
      <SuccessModal visible={visible} onDismiss={onDismissModal} />
    </div>
  );
}
