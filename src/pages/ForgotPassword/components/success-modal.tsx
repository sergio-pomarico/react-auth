import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Check } from "lucide-react";

interface SuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function SuccessModal({
  visible,
  onDismiss,
}: SuccessModalProps) {
  return (
    <Dialog open={visible} onOpenChange={onDismiss}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 ">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">
            Request sent successfully
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p className="text-sm text-muted-foreground mt-4">
              We've processed your password recovery request. If an account
              exists with this email, you'll receive a recovery code within the
              next few minutes.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Please also check your spam or junk mail folder.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-6">
          <Button onClick={onDismiss} className="w-full">
            Understood
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
