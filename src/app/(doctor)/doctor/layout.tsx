
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Clock,
  CreditCard,
  Star,
  MessageSquare,
  User,
  Share2,
  Lock,
  LogOut,
  ChevronDown,
  Bell,
  FileText,
  Briefcase,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Image from "next/image";
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import type { DoctorProfile } from '@/lib/types';

function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, handleSignOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/profile', {
          headers: { 'Authorization': `Bearer ${idToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch doctor profile:", error);
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

  const LogoutDialog = ({ trigger }: { trigger: React.ReactNode }) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                    You will be returned to the login page.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut} className="bg-destructive hover:bg-destructive/90">Log Out</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
  
  const doctorTitle = () => {
    if (!profile) return 'BDS, MDS - Oral & Maxillofacial Surgery';
    
    const degree = profile.education?.[0]?.degree || 'BDS';
    const designation = profile.experience?.[0]?.designation || 'MDS';
    const specialty = profile.specialty || 'General Practice';
    
    return `${degree}, ${designation} - ${specialty}`;
  };

  return (
    <SidebarProvider>
      <div className="flex bg-gray-50/50 w-full min-h-screen">
        <Sidebar className="bg-white border-r" collapsible="icon">
          <SidebarContent className="p-4">
            <SidebarGroup>
              <div className="flex flex-col items-center p-4 text-center group-data-[collapsible=icon]:hidden">
                <Avatar className="h-24 w-24 border-2 border-white rounded-full shadow-lg">
                  <AvatarImage src={profile?.imageUrl || user?.photoURL || "https://placehold.co/96x96.png"} alt={user?.displayName || "Doctor"} data-ai-hint="female doctor" />
                  <AvatarFallback>{user?.displayName?.charAt(0) || 'D'}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-xl font-semibold">{user?.displayName || "Dr. User"}</h3>
                <p className="text-sm text-muted-foreground">{doctorTitle()}</p>
              </div>
            </SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild href="/doctor" tooltip="Dashboard" isActive={pathname === '/doctor'}>
                  <Link href="/doctor" className="flex items-center gap-3">
                    <LayoutDashboard />
                    <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Appointments" isActive={pathname === '/doctor/appointments'}>
                   <Link href="/doctor/appointments" className="flex items-center gap-3">
                    <Calendar />
                    <span className="group-data-[collapsible=icon]:hidden">Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Prescriptions" isActive={pathname === '/doctor/prescriptions'}>
                   <Link href="/doctor/prescriptions" className="flex items-center gap-3">
                    <FileText />
                    <span className="group-data-[collapsible=icon]:hidden">Prescriptions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Medical Records" isActive={pathname === '/doctor/medical-records'}>
                   <Link href="/doctor/medical-records" className="flex items-center gap-3">
                    <Briefcase />
                    <span className="group-data-[collapsible=icon]:hidden">Medical Records</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Lab Results" isActive={pathname === '/doctor/lab-results'}>
                  <Link href="/doctor/lab-results" className="flex items-center gap-3">
                    <FlaskConical />
                    <span className="group-data-[collapsible=icon]:hidden">Lab Results</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Billing" isActive={pathname === '/doctor/billing'}>
                   <Link href="/doctor/billing" className="flex items-center gap-3">
                    <CreditCard />
                    <span className="group-data-[collapsible=icon]:hidden">Billing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="My Patients" isActive={pathname === '/doctor/my-patients'}>
                  <Link href="/doctor/my-patients" className="flex items-center gap-3">
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">My Patients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Schedule Timings" isActive={pathname === '/doctor/schedule-timings'}>
                  <Link href="/doctor/schedule-timings" className="flex items-center gap-3">
                    <Clock />
                    <span className="group-data-[collapsible=icon]:hidden">Schedule Timings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Transactions" isActive={pathname.startsWith('/doctor/transactions')}>
                        <CreditCard />
                        <span className="group-data-[collapsible=icon]:hidden flex-grow text-left">Transactions</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/doctor/transactions/consultation-payments'}>
                          <Link href="/doctor/transactions/consultation-payments">Consultation Payments</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                         <SidebarMenuSubButton asChild isActive={pathname === '/doctor/transactions/invoices'}>
                          <Link href="/doctor/transactions/invoices">Invoices</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                         <SidebarMenuSubButton asChild isActive={pathname === '/doctor/transactions/payouts'}>
                          <Link href="/doctor/transactions/payouts">Payouts</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reviews" isActive={pathname === '/doctor/reviews'}>
                  <Link href="/doctor/reviews" className="flex items-center gap-3">
                    <Star />
                    <span className="group-data-[collapsible=icon]:hidden">Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Message" isActive={pathname === '/doctor/messages'}>
                  <Link href="/doctor/messages" className="flex items-center gap-3">
                    <MessageSquare />
                    <span className="group-data-[collapsible=icon]:hidden">Message</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile Settings" isActive={pathname === '/doctor/profile-settings'}>
                  <Link href="/doctor/profile-settings" className="flex items-center gap-3">
                    <User />
                    <span className="group-data-[collapsible=icon]:hidden">Profile settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Social Media" isActive={pathname === '/doctor/social-media'}>
                  <Link href="/doctor/social-media" className="flex items-center gap-3">
                    <Share2 />
                    <span className="group-data-[collapsible=icon]:hidden">Social Media</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu className="p-4">
              <SidebarMenuItem>
                 <LogoutDialog trigger={
                    <SidebarMenuButton asChild tooltip="Logout">
                        <div className="flex items-center gap-3 w-full">
                            <LogOut />
                            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                        </div>
                    </SidebarMenuButton>
                }/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-xl font-semibold hidden md:block">Dashboard</h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.imageUrl || user?.photoURL || "https://placehold.co/40x40.png"} alt={user?.displayName || "Doctor"} data-ai-hint="female doctor" />
                        <AvatarFallback>{user?.displayName?.charAt(0) || 'D'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || "Dr. User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/doctor/profile-settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/doctor/change-password">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                      </Link>
                    </DropdownMenuItem>
                     <LogoutDialog trigger={
                         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                     } />
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedLayout allowedRole="doctor" loginPath="/doctor-login">
        <DoctorDashboardLayout>{children}</DoctorDashboardLayout>
      </ProtectedLayout>
    </AuthProvider>
  );
}
