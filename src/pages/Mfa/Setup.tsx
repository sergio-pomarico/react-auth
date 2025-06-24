import authServices from "@/services/auth";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import ToastError from "@/shared/components/toast-error";
import type { MfaSetupResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { UserRoundCheck } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function SetupMfaPage() {
  const {
    mutate,
    data,
    isPending: isLoading,
    isError,
  } = useMutation<MfaSetupResponse>({
    mutationFn: async () => await authServices.setupMfa(),
    onError: (error) => ToastError(error),
  });
  const navigate = useNavigate();
  const goToVerification = () => navigate("/mfa-verify");
  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Setup Multi-Factor Authentication
          </CardTitle>
          <CardDescription className="text-center">
            Scan the QR code with your authenticator app to set up MFA for your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center mb-12">
              <Skeleton className="h-48 w-48 rounded-4xl" />
            </div>
          )}
          {isError && (
            <p className="text-red-500 text-center mb-4">
              Failed to generate QR code. Please try again.
            </p>
          )}
          {!isLoading && !isError && (
            <div className="flex flex-col items-center space-y-4 mb-12">
              <img src={data?.qr} alt="QR Code" />
            </div>
          )}
          <Button
            type="button"
            className="w-full"
            disabled={isLoading}
            onClick={goToVerification}
          >
            <>
              <UserRoundCheck size={16} className="mr-2" />
              Go to verification
            </>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
