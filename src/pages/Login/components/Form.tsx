import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

import { loginSchema, type LoginPayload } from "@/pages/Login/schemas/login";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Checkbox } from "@/shared/components/ui/checkbox";

export interface LoginFormProps {
  onSubmitForm: (values: LoginPayload) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-sm text-red-500 mt-1">{error}</p>;
}

export default function LoginForm({
  onSubmitForm,
  onForgotPassword,
  onRegister,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const form = useForm({
    defaultValues: {
      email: localStorage.getItem("email") ?? "",
      password: "",
    },
    onSubmit: ({ value }) => {
      onSubmitForm(value);
    },
  });

  // Load saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const wasRemembered = localStorage.getItem("rememberMe") === "true";
    if (savedEmail && wasRemembered) {
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);

    if (checked) {
      if (form.state.values.email.trim()) {
        localStorage.setItem("email", form.state.values.email.trim());
      }
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="email"
        validators={{
          onBlurAsyncDebounceMs: 500,
          onChange: loginSchema.shape.email,
        }}
        children={(field) => (
          <div className="space-y-4 mb-8">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="email@example.com"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError error={field.state.meta.errors[0]?.message} />
          </div>
        )}
      />
      <form.Field
        name="password"
        validators={{
          onBlurAsyncDebounceMs: 500,
          onChange: loginSchema.shape.password,
        }}
        children={(field) => (
          <div className="space-y-2 mb-8">
            <div className="flex items-center">
              <Label htmlFor="login-password">Password</Label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError error={field.state.meta.errors[0]?.message} />
          </div>
        )}
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onCheckedChange={handleRememberMeChange}
        />
        <Label htmlFor="remember" className="text-sm text-gray-600">
          Remember me
        </Label>
      </div>
      <Button type="submit" className="w-full">
        <>
          <LogIn size={16} className="mr-2" />
          Log In
        </>
      </Button>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
      <div className="text-center text-sm">
        <span className="inline-block">Don&apos;t have an account?</span>
        <Button
          type="button"
          onClick={onRegister}
          variant="link"
          className="underline underline-offset-4"
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
