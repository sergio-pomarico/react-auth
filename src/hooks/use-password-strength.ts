import { useState, useEffect } from "react";

export function usePasswordStrength(password: string) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;

    if (password.length >= 8) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/\d/.test(password)) score++;

    if (/[!@#$-%^_&*]/.test(password)) score++;

    setStrength(score);
  }, [password]);

  return strength; // 0 (muy débil) a 5 (muy fuerte)
}
