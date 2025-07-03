import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/pages/Login/schemas/login";

interface ForgotPasswordFormProps {
  onSubmitForm: (email: string) => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-sm text-red-500 mt-1">{error}</p>;
}

export default function ForgotPasswordForm({
  onSubmitForm,
}: ForgotPasswordFormProps) {
  const form = useForm({
    defaultValues: {
      email: localStorage.getItem("email") ?? "",
    },
    onSubmit: ({ value }) => {
      onSubmitForm(value.email);
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
      <form.Subscribe
        selector={(state) => state.canSubmit}
        children={(canSubmit) => (
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            Send recovery code
          </Button>
        )}
      />
    </form>
  );
}
