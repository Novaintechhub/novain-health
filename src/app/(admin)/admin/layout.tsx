"use client";

import { usePathname } from 'next/navigation'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
  User,
  LogOut,
  Bell,
  CreditCard,
  Star,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    const path = pathname.split('/').pop();
    if (path === 'admin') return 'Dashboard';
    if (!path) return 'Admin';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50/50 w-full">
        <Sidebar className="bg-white border-r" collapsible="icon">
          <SidebarContent className="p-4">
            <div className="flex justify-center items-center p-4 group-data-[collapsible=icon]:hidden">
                <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
            </div>
             <div className="flex justify-center items-center p-4 group-data-[collapsible=icon]:flex hidden">
                <Image src="/logo-icon.png" alt="NovainHealth Logo" width={32} height={32} />
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild href="/admin" tooltip="Dashboard" isActive={pathname === '/admin'}>
                  <Link href="/admin" className="flex items-center gap-3">
                    <LayoutDashboard />
                    <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Doctors" isActive={pathname === '/admin/doctors'}>
                   <Link href="/admin/doctors" className="flex items-center gap-3">
                    <UserCog />
                    <span className="group-data-[collapsible=icon]:hidden">Doctors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Patients" isActive={pathname === '/admin/patients'}>
                   <Link href="/admin/patients" className="flex items-center gap-3">
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">Patients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Appointments" isActive={pathname === '/admin/appointments'}>
                   <Link href="/admin/appointments" className="flex items-center gap-3">
                    <Calendar />
                    <span className="group-data-[collapsible=icon]:hidden">Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Transactions" isActive={pathname === '/admin/transactions'}>
                   <Link href="/admin/transactions" className="flex items-center gap-3">
                    <CreditCard />
                    <span className="group-data-[collapsible=icon]:hidden">Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reviews" isActive={pathname === '/admin/reviews'}>
                  <Link href="/admin/reviews" className="flex items-center gap-3">
                    <Star />
                    <span className="group-data-[collapsible=icon]:hidden">Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" isActive={pathname === '/admin/profile'}>
                  <Link href="/admin/profile" className="flex items-center gap-3">
                    <User />
                    <span className="group-data-[collapsible=icon]:hidden">Profile</span>
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
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col h-screen">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-xl font-semibold hidden md:block">{getPageTitle()}</h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="person portrait" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          admin@novain.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
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
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
