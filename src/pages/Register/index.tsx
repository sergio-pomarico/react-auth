import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import SignupForm from "./components/Form";
import type { RegisterPayload } from "./schemas/register";

export default function RegisterPage() {
  const onSubmit = (values: RegisterPayload) => {
    console.log("Form submitted with values:", values);
    // Here you would typically handle the registration logic, such as calling an API
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm onSubmitForm={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
