import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import MFAVerifyForm from "./components/FormVerify";
import ToastError from "@/shared/components/toast-error";
import { LoadingOverlay } from "@/shared/components/loader";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";

export default function VerifyMFAPage() {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (token: string) => await authServices.mfaVerify(token),
    onError: (error) => ToastError(error),
    onSuccess: (data) => {
      const {
        credentials: { accessToken, refreshToken },
      } = data;
      login(accessToken, refreshToken);
      navigate("/");
    },
  });

  const { mutate: resetMutate } = useMutation({
    mutationFn: async () => await authServices.resetMfa(),
    onError: (error) => ToastError(error),
    onSuccess: () => {
      navigate("/mfa-setup");
    },
  });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const onSubmit = (token: string) => {
    mutate(token);
  };
  const onResetMFA = () => {
    resetMutate();
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            One-Time Password
          </CardTitle>
          <CardDescription className="text-center">
            Please enter the one-time password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MFAVerifyForm onSubmitForm={onSubmit} onPressResetMFA={onResetMFA} />
        </CardContent>
      </Card>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
