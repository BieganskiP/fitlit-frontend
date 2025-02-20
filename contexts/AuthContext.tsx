"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { getUser } from "@/services/users";
import { User } from "@/types";
import { usePathname } from "next/navigation";

// Define the context type
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

// Paths where we don't want to fetch the user
const PUBLIC_PATHS = ["/", "/inactive", "/signup"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData as User);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    // Only fetch user if not on a public path
    if (!PUBLIC_PATHS.includes(pathname)) {
      fetchUser();
    }
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
