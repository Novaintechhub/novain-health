
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

  // The role is considered "loading" if the main auth state is loading OR if the user is present but the role hasn't been determined yet.
  const roleLoading = loading || (!!user && role === undefined);

  useEffect(() => {
    // Wait until loading is completely finished before making any decisions.
    if (roleLoading) {
      return;
    }

    // If there's no user, or the role doesn't match, redirect.
    if (!user || role !== allowedRole) {
      router.replace(loginPath);
    }
  }, [roleLoading, user, role, allowedRole, loginPath, router]);

  // While loading, show a full-screen skeleton to prevent content flashing or premature redirects.
  if (roleLoading) {
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

  // If loading is finished and the user and role are correct, render the children.
  if (user && role === allowedRole) {
    return <>{children}</>;
  }

  // Fallback: This will briefly show while the redirect is happening.
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
