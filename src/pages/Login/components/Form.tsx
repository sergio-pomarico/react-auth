import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/shared/components/button";

import { loginSchema, type LoginPayload } from "@/pages/Login/schemas/login";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

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
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      onSubmitForm(value);
    },
  });

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

      <Button type="submit" className="w-full">
        <>
          <LogIn size={16} className="mr-2" />
          Log In
        </>
      </Button>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="underline underline-offset-4"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
