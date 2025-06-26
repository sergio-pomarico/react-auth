import authServices from "@/services/auth";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { UserRoundCheck, Clipboard, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function SetupMfaPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mfa-setup"],
    queryFn: async () => await authServices.setupMfa(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  const navigate = useNavigate();
  const goToVerification = () => navigate("/mfa-verify");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(data?.secret || "");
    toast.success("Secret copy successfuly", {
      icon: <Check className="h-4 w-4" />,
      richColors: true,
      duration: 3000,
      position: "bottom-center",
    });
  };

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
              <Skeleton className="h-48 w-48 rounded-4xl mb-8" />
              <Skeleton className="h-8 w-96 rounded-4xl" />
            </div>
          )}
          {isError && (
            <p className="text-red-500 text-center mb-4">
              Failed to generate QR code. Please try again.
            </p>
          )}
          {!isLoading && !isError && (
            <div>
              <div className="flex flex-col items-center space-y-2 mb-8">
                <img src={data?.qr} alt="QR Code" />
              </div>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or enter the code manually
                  </span>
                </div>
              </div>
              <div className="relative mb-4">
                <Input value={data?.secret} readOnly />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Clipboard size={16} />
                </button>
              </div>
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
