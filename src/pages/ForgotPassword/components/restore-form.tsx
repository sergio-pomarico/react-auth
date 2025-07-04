import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ZodIssue } from "zod";
import PasswordStrengthMeter from "@/shared/components/password-strength";
import {
  restoreSchema,
  type RestorePayload,
} from "../schemas/restore-password";

interface RestorePasswordFormProps {
  onSubmitForm: (value: RestorePayload) => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-sm text-red-500 mt-1">{error}</p>;
}

export default function RestorePasswordForm({
  onSubmitForm,
}: RestorePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      code: "",
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
        name="code"
        validators={{
          onChange: restoreSchema.shape.code,
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2 mt-4">
            <Label htmlFor="signup-name">Verification Code</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter the code"
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
          onChange: restoreSchema.shape.password,
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="login-password">New Password</Label>
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
            const confirmPasswordSchema = restoreSchema.shape.confirmPassword;
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
          <div className="space-y-2 mb-8">
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
      <form.Subscribe
        selector={(state) => state.canSubmit}
        children={(canSubmit) => (
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            Reset Password
          </Button>
        )}
      />
    </form>
  );
}
