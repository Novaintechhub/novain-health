"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

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

  // If the user exists but we haven't resolved their role yet, keep "loading"
  const roleLoading = !!user && (role === undefined || role === null);

  const normalizedRole = useMemo(
    () => role?.toString().trim().toLowerCase(),
    [role]
  );
  const normalizedAllowed = allowedRole.toLowerCase();

  useEffect(() => {
    if (loading || roleLoading) return;

    if (!user) {
      router.replace(loginPath);
      return;
    }

    if (normalizedRole && normalizedRole !== normalizedAllowed) {
      router.replace(loginPath);
      return;
    }
  }, [
    loading,
    roleLoading,
    user,
    normalizedRole,
    normalizedAllowed,
    router,
    loginPath,
  ]);

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="space-y-4 w-1/2">
          <h1 className="text-2xl font-bold text-center">Loading...</h1>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (user && normalizedRole === normalizedAllowed) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="space-y-4 w-1/2">
        <h1 className="text-2xl font-bold text-center">Redirecting...</h1>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
