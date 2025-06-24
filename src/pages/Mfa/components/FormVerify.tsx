import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { LogIn } from "lucide-react";

export interface MFAVerifyFormProps {
  onSubmitForm: () => void;
}

export default function MFAVerifyForm({ onSubmitForm }: MFAVerifyFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmitForm();
      }}
      className="space-y-4"
    >
      <div className="space-y-2 mb-8">
        <div className="flex items-center justify-center">
          <InputOTP
            maxLength={6}
            onChange={(value) => {
              console.log("OTP value changed:", value);
            }}
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
      </div>
      <Button type="submit" className="w-full">
        <>
          <LogIn size={16} className="mr-2" />
          Verify code
        </>
      </Button>
    </form>
  );
}
