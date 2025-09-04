
"use client";

import { AuthProvider } from '@/context/AuthContext';
import ProtectedLayout from '@/components/shared/ProtectedLayout';
import { usePathname } from 'next/navigation'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FlaskConical,
  MessageSquare,
  User,
  LogOut,
  Bell,
  Home,
  Briefcase,
  Lock,
  Share,
  FileText,
  CreditCard,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import type { PatientProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format, differenceInYears } from 'date-fns';

function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, handleSignOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/patient/profile', {
          headers: { 'Authorization': `Bearer ${idToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch patient profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const getAge = (dob: string | undefined) => {
    if (!dob) return '';
    try {
      return `${differenceInYears(new Date(), new Date(dob))} years`;
    } catch {
      return '';
    }
  };

  const SidebarProfile = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center p-4 text-center group-data-[collapsible=icon]:hidden">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-32 mt-4" />
          <Skeleton className="h-4 w-20 mt-2" />
          <Skeleton className="h-4 w-28 mt-2" />
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center p-4 text-center group-data-[collapsible=icon]:hidden">
        <Avatar className="h-24 w-24 border-2 border-primary rounded-full shadow-lg">
          <AvatarImage src={profile?.imageUrl || user?.photoURL || "https://placehold.co/96x96.png"} alt={user?.displayName || "Patient"} data-ai-hint="woman portrait" />
          <AvatarFallback>{user?.displayName?.charAt(0) || 'P'}</AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-xl font-semibold">{user?.displayName || "Patient"}</h3>
        <p className="text-sm text-muted-foreground">Patient ID: {profile?.patientId}</p>
        <div className="text-center text-sm text-muted-foreground mt-2 space-y-1">
          {profile?.dateOfBirth && <p>{format(new Date(profile.dateOfBirth), 'dd MMM yyyy')}, {getAge(profile.dateOfBirth)}</p>}
          {(profile?.lga || profile?.stateOfResidence) && <p>{profile.lga}, {profile.stateOfResidence}</p>}
        </div>
        <Button asChild variant="outline" className="mt-4 text-primary border-primary">
          <Link href="/patients/profile">View Details</Link>
        </Button>
      </div>
    );
  };
  

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50/50">
        <Sidebar className="bg-white border-r" collapsible="icon">
          <SidebarContent className="p-4">
            <SidebarGroup>
               <SidebarProfile />
            </SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/patients/dashboard'}>
                  <Link href="/patients/dashboard" className="flex items-center gap-3">
                    <LayoutDashboard />
                    <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Appointments" isActive={pathname === '/patients/appointments'}>
                   <Link href="/patients/appointments" className="flex items-center gap-3">
                    <Calendar />
                    <span className="group-data-[collapsible=icon]:hidden">Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Prescriptions" isActive={pathname === '/patients/prescriptions'}>
                   <Link href="/patients/prescriptions" className="flex items-center gap-3">
                    <FileText />
                    <span className="group-data-[collapsible=icon]:hidden">Prescriptions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Medical Records" isActive={pathname === '/patients/medical-records'}>
                  <Link href="/patients/medical-records" className="flex items-center gap-3">
                    <Briefcase />
                    <span className="group-data-[collapsible=icon]:hidden">Medical Records</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Billing" isActive={pathname === '/patients/billing'}>
                  <Link href="/patients/billing" className="flex items-center gap-3">
                    <CreditCard />
                    <span className="group-data-[collapsible=icon]:hidden">Billing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Wallet" isActive={pathname === '/patients/wallet'}>
                  <Link href="/patients/wallet" className="flex items-center gap-3">
                    <Wallet />
                    <span className="group-data-[collapsible=icon]:hidden">Wallet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Doctors" isActive={pathname === '/patients/find-a-doctor'}>
                  <Link href="/patients/find-a-doctor" className="flex items-center gap-3">
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">Doctors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Lab Tests" isActive={pathname === '/patients/lab-tests'}>
                  <Link href="/patients/lab-tests" className="flex items-center gap-3">
                    <FlaskConical />
                    <span className="group-data-[collapsible=icon]:hidden">Lab Tests</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Messages" isActive={pathname === '/patients/messages'}>
                  <Link href="/patients/messages" className="flex items-center gap-3">
                    <MessageSquare />
                    <span className="group-data-[collapsible=icon]:hidden">Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile Settings" isActive={pathname === '/patients/profile-settings'}>
                  <Link href="/patients/profile-settings" className="flex items-center gap-3">
                    <User />
                    <span className="group-data-[collapsible=icon]:hidden">Profile settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Referrals" isActive={pathname === '/patients/referrals'}>
                  <Link href="/patients/referrals" className="flex items-center gap-3">
                    <Share />
                    <span className="group-data-[collapsible=icon]:hidden">Referrals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu className="p-4">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout" onClick={handleSignOut}>
                  <Link href="/patient-login">
                    <LogOut />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden md:block">
                <p className="text-sm text-muted-foreground">Home / Dashboard</p>
                <h1 className="text-lg font-bold">Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button asChild type="button" style={{ backgroundColor: '#D90067', color: 'white' }} className="rounded-full px-2 sm:px-4">
                <Link href="/emergency-response">Emergency</Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.imageUrl || user?.photoURL || "https://placehold.co/40x40.png"} alt={user?.displayName || "Patient"} data-ai-hint="woman portrait" />
                        <AvatarFallback>{user?.displayName?.charAt(0) || 'P'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || "Patient User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/patients/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/patients/change-password">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}


export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedLayout allowedRole="patient" loginPath="/patient-login">
        <PatientDashboardLayout>{children}</PatientDashboardLayout>
      </ProtectedLayout>
    </AuthProvider>
  );
}
