import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useForm } from "@tanstack/react-form";
import { LogIn } from "lucide-react";

export interface MFAVerifyFormProps {
  onSubmitForm: (token: string) => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-sm text-red-500 mt-1">{error}</p>;
}

export default function MFAVerifyForm({ onSubmitForm }: MFAVerifyFormProps) {
  const form = useForm({
    defaultValues: {
      token: "",
    },
    onSubmit: ({ value }) => {
      onSubmitForm(value.token);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit(e);
      }}
      className="space-y-4"
    >
      <form.Field
        name="token"
        validators={{
          onChange: ({ value }) => {
            if (!/^\d*$/.test(value)) {
              return "Token must be numeric";
            }
            if (value.length < 6) {
              return "Token must be 6 digits or less";
            }
            return undefined;
          },
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-center">
              <InputOTP
                maxLength={6}
                onChange={field.handleChange}
                value={field.state.value}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <FieldError error={field.state.meta.errors[0]} />
          </div>
        )}
      />
      <Button type="submit" className="w-full" disabled={!form.state.isValid}>
        <>
          <LogIn size={16} className="mr-2" />
          Verify code
        </>
      </Button>
    </form>
  );
}
