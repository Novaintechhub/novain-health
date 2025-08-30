
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  allowedRole: 'doctor' | 'patient';
  loginPath: string;
}

export default function ProtectedLayout({ children, allowedRole, loginPath }: ProtectedLayoutProps) {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // This effect runs whenever the authentication state changes.
    // We wait until the initial loading from Firebase is complete.
    if (!loading) {
      // If there's no authenticated user, or the role check is complete but doesn't match,
      // we must redirect to the login page.
      if (!user || (role && role !== allowedRole)) {
        router.push(loginPath);
      }
    }
  }, [user, loading, role, router, allowedRole, loginPath]);

  // While the AuthContext is loading the user's state from Firebase,
  // or if the user is not authenticated yet (and the redirect is about to happen),
  // show a loading skeleton. This is crucial to prevent the "flicker" of
  // protected content and to stop the redirect loop.
  if (loading || !user || (role && role !== allowedRole)) {
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

  // If loading is complete, a user exists, and their role is correct, render the children.
  return <>{children}</>;
}
