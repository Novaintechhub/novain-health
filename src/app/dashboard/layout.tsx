
"use client";

import type { Metadata } from "next";
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
} from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Image from "next/image";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50/50 w-full">
        <Sidebar className="bg-white border-r">
          <SidebarContent className="p-4">
            <SidebarGroup>
              <div className="flex items-center gap-4 p-4">
                <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
              </div>
            </SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Appointments" isActive={pathname === '/dashboard/appointments'}>
                   <Link href="/dashboard/appointments">
                    <Calendar />
                    Appointments
                   </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="My Patients" isActive={pathname === '/dashboard/my-patients'}>
                  <Link href="/dashboard/my-patients">
                    <Users />
                    My Patients
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Schedule Timings" isActive={pathname === '/dashboard/schedule-timings'}>
                  <Link href="/dashboard/schedule-timings">
                    <Clock />
                    Schedule Timings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Transactions" isActive={pathname.startsWith('/dashboard/transactions')}>
                        <CreditCard />
                        Transactions
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/dashboard/transactions/consultation-payments'}>
                          <Link href="/dashboard/transactions/consultation-payments">
                            Consultation Payments
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/dashboard/transactions/payouts'}>
                          <Link href="/dashboard/transactions/payouts">
                            Payouts
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reviews" isActive={pathname === '/dashboard/reviews'}>
                  <Link href="/dashboard/reviews">
                    <Star />
                    Reviews
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Message" isActive={pathname === '/dashboard/messages'}>
                  <Link href="/dashboard/messages">
                    <MessageSquare />
                    Message
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile Settings" isActive={pathname === '/dashboard/profile-settings'}>
                  <Link href="/dashboard/profile-settings">
                    <User />
                    Profile settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Social Media" isActive={pathname === '/dashboard/social-media'}>
                  <Link href="/dashboard/social-media">
                    <Share2 />
                    Social Media
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Change Password" isActive={pathname === '/dashboard/change-password'}>
                  <Link href="/dashboard/change-password">
                    <Lock />
                    Change password
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu className="p-4">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link href="/general-login">
                    <LogOut />
                    Logout
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-xl font-semibold hidden md:block">Dashboard</h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button type="button" style={{ backgroundColor: '#D90067', color: 'white' }} className="rounded-full px-2 sm:px-4">
                Emergency
              </Button>
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Dr. Susan Mandible" data-ai-hint="female doctor" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Dr. Susan Mandible</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          susan.m@novain.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile-settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/change-password">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/general-login">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
