"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  email: string | null;
  setEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  email: null,
  setEmail: () => {},
});

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Load email from cookies (if available)
    const storedEmail = Cookies.get("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Easy Access
export const useAuth = () => useContext(AuthContext);
