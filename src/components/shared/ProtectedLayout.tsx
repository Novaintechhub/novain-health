
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
    // Wait until the initial loading is finished
    if (!loading) {
      // If there's no user, redirect to the login page.
      if (!user) {
        router.push(loginPath);
      } 
      // If there is a user but their role doesn't match, redirect them.
      // This prevents a doctor from accessing patient pages and vice-versa.
      else if (role && role !== allowedRole) {
        // Redirect to a safe default page.
        router.push('/');
      }
    }
  }, [user, loading, role, router, allowedRole, loginPath]);

  // While loading, or if the user is not authenticated or has the wrong role,
  // show a loading state to prevent flashing the content of the protected page.
  if (loading || !user || (role && role !== allowedRole)) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="space-y-4 w-1/2">
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
