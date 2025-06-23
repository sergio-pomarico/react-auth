import type { ErrorResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ToastError = (error: Error) => {
  if (!error) return;
  if (error instanceof AxiosError) {
    const { error: info } = error.response?.data as ErrorResponse;
    toast.error(info.message, {
      description: info.description,
      icon: <AlertTriangle className="h-4 w-4" />,
      richColors: true,
      duration: 5000,
      position: "bottom-center",
    });
  }
};

export default ToastError;
