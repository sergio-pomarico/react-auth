import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({
  isVisible,
  message = "Loading...",
  className,
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        {message && (
          <p className="text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
