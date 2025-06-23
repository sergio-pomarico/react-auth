import { Progress } from "@/shared/components/ui/progress";
import { usePasswordStrength } from "../hooks/use-password-strength";

const labels = {
  1: "very weak",
  2: "weak",
  3: "regular",
  4: "strong",
  5: "very strong",
};

const colors = {
  1: "text-red-500",
  2: "text-orange-500",
  3: "text-yellow-500",
  4: "text-blue-500",
  5: "text-green-500",
};

export default function PasswordStrengthMeter({
  password,
}: {
  password: string;
}) {
  const strength = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Password Strong</span>
        <span
          className={`text-sm font-medium ${
            colors[strength as keyof typeof colors] || "text-red-500"
          }`}
        >
          {labels[strength as keyof typeof colors] || "very weak"}
        </span>
      </div>
      <Progress
        value={(strength / 5) * 100}
        className="h-2 "
        color={colors[strength as keyof typeof colors] || "text-red-500"}
      />
    </div>
  );
}
