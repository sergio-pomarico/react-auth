import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { LoadingOverlay } from "@/shared/components/loader";
import MFAVerifyForm from "./components/FormVerify";

export default function VerifyMFAPage() {
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
          <MFAVerifyForm onSubmitForm={() => {}} />
        </CardContent>
      </Card>
      <LoadingOverlay isVisible={false} />
    </div>
  );
}
