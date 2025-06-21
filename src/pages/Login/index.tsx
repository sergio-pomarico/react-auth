import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import LoginForm from "./components/Form";
import type { LoginPayload } from "./schemas/login";

export default function LoginPage() {
  const onSubmit = (values: LoginPayload) => {
    console.log("Form submitted with values:", values);
    // Here you would typically handle the login logic, such as calling an API
  };
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
    </div>
  );
}
