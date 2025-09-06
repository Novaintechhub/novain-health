
"use client";

import { AuthProvider } from '@/context/AuthContext';
import AdminProtectedLayout from '@/components/shared/AdminProtectedLayout';
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
  User,
  LogOut,
  Bell,
  CreditCard,
  Star,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/context/AuthContext';

function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { handleSignOut } = useAuth();

  const getPageTitle = () => {
    const path = pathname.split('/').pop();
    if (path === 'admin') return 'Dashboard';
    if (!path) return 'Admin';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

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
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminProtectedLayout>
                <AdminDashboardLayout>{children}</AdminDashboardLayout>
            </AdminProtectedLayout>
        </AuthProvider>
    )
}
