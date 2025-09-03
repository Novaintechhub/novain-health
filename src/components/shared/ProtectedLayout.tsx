
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AppLoader from "@/components/shared/app-loader";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  allowedRole: "doctor" | "patient";
  loginPath: string;
}

export default function ProtectedLayout({
  children,
  allowedRole,
  loginPath,
}: ProtectedLayoutProps) {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  const roleLoading = loading || (!!user && role === undefined);

  useEffect(() => {
    if (roleLoading) {
      return;
    }

    if (!user || role !== allowedRole) {
      router.replace(loginPath);
    }
  }, [roleLoading, user, role, allowedRole, loginPath, router]);

  if (roleLoading) {
    return <AppLoader />;
  }

  if (user && role === allowedRole) {
    return <>{children}</>;
  }

  // Fallback while redirecting
  return <AppLoader />;
}
