
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AppLoader from "@/components/shared/app-loader";

interface AdminProtectedLayoutProps {
  children: React.ReactNode;
}

export default function AdminProtectedLayout({
  children,
}: AdminProtectedLayoutProps) {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  const roleLoading = loading || (!!user && role === undefined);

  useEffect(() => {
    if (roleLoading) {
      return;
    }

    if (!user || role !== "admin") {
      router.replace("/admin-login");
    }
  }, [roleLoading, user, role, router]);

  if (roleLoading) {
    return <AppLoader />;
  }

  if (user && role === "admin") {
    return <>{children}</>;
  }

  // Fallback while redirecting
  return <AppLoader />;
}
