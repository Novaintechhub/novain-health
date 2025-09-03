"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  getAuth,
  onIdTokenChanged,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { app, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: "doctor" | "patient" | null;
  handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  handleSignOut: () => {},
});

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    const auth = getAuth(app);
    const redirectPath = role === "doctor" ? "/doctor-login" : "/patient-login";

    try {
      await fbSignOut(auth);
      setUser(null);
      setRole(null);
      router.replace(redirectPath);
    } catch (error) {
      console.error("Sign out error", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out.",
      });
    }
  }, [role, router, toast]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      if (getAuth(app).currentUser) {
        toast({
          title: "You've been logged out",
          description: "You were logged out due to inactivity.",
        });
        handleSignOut();
      }
    }, INACTIVITY_TIMEOUT);
  }, [handleSignOut, toast]);

  useEffect(() => {
    if (user) {
      resetInactivityTimer();
      const events: (keyof WindowEventMap)[] = [
        "mousemove",
        "keydown",
        "scroll",
        "click",
      ];
      events.forEach((event) =>
        window.addEventListener(event, resetInactivityTimer)
      );

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetInactivityTimer)
        );
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      };
    }
  }, [user, resetInactivityTimer, pathname]);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setLoading(true);
      setUser(newUser);

      if (!newUser) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // Try custom claims first
        const tokenResult = await newUser.getIdTokenResult();
        let userRole =
          (tokenResult.claims.role as "doctor" | "patient" | null) ?? null;

        // Fallback to Firestore profile if claim is missing
        if (!userRole) {
          const [docDoctor, docPatient] = await Promise.all([
            getDoc(doc(db, "doctors", newUser.uid)),
            getDoc(doc(db, "patients", newUser.uid)),
          ]);
          if (docDoctor.exists()) userRole = "doctor";
          else if (docPatient.exists()) userRole = "patient";
        }

        setRole(userRole);
      } catch (error) {
        console.error("Error resolving user role:", error);
        setRole(null);
        // Avoid auto sign-out on transient errors to prevent loops
        // await fbSignOut(auth);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
