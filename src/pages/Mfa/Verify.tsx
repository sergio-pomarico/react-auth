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
        credentials: { accessToken },
      } = data;
      login(accessToken);
      navigate("/");
    },
  });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const onSubmit = (token: string) => {
    mutate(token);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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
          <MFAVerifyForm onSubmitForm={onSubmit} />
        </CardContent>
      </Card>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
