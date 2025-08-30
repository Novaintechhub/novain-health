
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
    if (!loading) {
      if (!user) {
        // If not logged in, redirect to the specified login page
        router.push(loginPath);
      } else if (role && role !== allowedRole) {
        // If logged in but with the wrong role, redirect to a default page or show an error
        // For simplicity, we'll redirect to the home page.
        // A more robust solution might redirect doctors to their login and patients to theirs.
        console.warn(`Role mismatch: expected ${allowedRole}, got ${role}. Redirecting.`);
        router.push('/'); 
      }
    }
  }, [user, loading, role, router, allowedRole, loginPath]);

  if (loading || !user || (role && role !== allowedRole)) {
    // Show a loading skeleton or a blank screen while checking auth state or redirecting
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

  return <>{children}</>;
}
