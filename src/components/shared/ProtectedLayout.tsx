
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
    // Do not run this effect until the auth state is fully loaded
    if (loading) {
      return;
    }

    // If loading is complete, and there's no user, or the role doesn't match,
    // then it's safe to redirect.
    if (!user || (role && role !== allowedRole)) {
      router.push(loginPath);
    }
  }, [user, loading, role, router, allowedRole, loginPath]);

  // While the initial authentication check is running, display a loading screen.
  // This is the key to preventing the redirect loop. We render nothing but the
  // skeleton until Firebase has confirmed the user's auth state.
  if (loading) {
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

  // If loading is complete, and the user exists with the correct role,
  // the useEffect hook above will not redirect. We can safely render the children.
  if (user && role === allowedRole) {
    return <>{children}</>;
  }

  // If loading is complete but the user/role is invalid, the useEffect will
  // trigger a redirect. We return a loading skeleton here as well to prevent
  // any flicker of protected content before the redirect happens.
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
