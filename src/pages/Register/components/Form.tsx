import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import PasswordStrengthMeter from "./PasswordStrength";
import { registerSchema, type RegisterPayload } from "../schemas/register";
import { type ZodIssue } from "zod";

export interface RegisterFormProps {
  onSubmitForm: (values: RegisterPayload) => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-sm text-red-500 mt-1">{error}</p>;
}

export default function SignupForm({ onSubmitForm }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        name="fullname"
        validators={{
          onChange: registerSchema.shape.fullname,
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Please add your name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError error={field.state.meta.errors[0]?.message} />
          </div>
        )}
      />
      <form.Field
        name="email"
        validators={{
          onChange: registerSchema.shape.email,
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2">
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
          onChange: registerSchema.shape.password,
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
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
            <PasswordStrengthMeter password={field.state.value} />
            <FieldError error={field.state.meta.errors[0]?.message} />
          </div>
        )}
      />

      <form.Field
        name="confirmPassword"
        validators={{
          onChange: ({ value, fieldApi }) => {
            const confirmPasswordSchema = registerSchema.shape.confirmPassword;
            const password = fieldApi.form.getFieldValue("password");
            if (value !== password) {
              return { message: "Passwords do not match" };
            }
            const result = confirmPasswordSchema.safeParse(value);
            if (!result.success) {
              const error = JSON.parse(result.error?.message) as ZodIssue[];
              return { message: error[0].message };
            }
            return undefined;
          },
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError error={field.state.meta.errors[0]?.message} />
          </div>
        )}
      />
      <Button type="submit" className="w-full">
        <>
          <UserPlus size={16} className="mr-2" />
          Create Account
        </>
      </Button>
    </form>
  );
}
