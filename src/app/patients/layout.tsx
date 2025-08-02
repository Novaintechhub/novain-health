
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
  HeartPulse,
  MessageSquare,
  User,
  LogOut,
  Bell,
  Home,
  Briefcase,
  Lock,
  Share,
} from "lucide-react";
import Link from "next/link";


const NovainLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="124" height="34" viewBox="0 0 124 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.8079 9.30872V1.02734H33.0116V22.613H25.8079V14.1201C25.8079 13.091 25.8079 12.062 25.8079 10.9907C25.7656 10.1508 25.5562 9.56208 24.8827 9.17721C24.2092 8.79234 23.3241 8.79234 22.4812 9.135L17.6713 10.8142V2.8858L25.8079 9.30872Z" fill="#002244"/>
      <path d="M0.852051 1.02734H8.05574V22.613H0.852051V1.02734Z" fill="#002244"/>
      <path d="M17.0689 22.613V14.9961L9.65361 17.792V22.613H17.0689Z" fill="#002244"/>
      <path d="M17.0689 1.02734H9.65361V13.6264L17.0689 11.2371V1.02734Z" fill="#002244"/>
      <path d="M51.841 11.8949C51.841 12.9239 51.1528 13.5915 50.1534 13.5915C49.154 13.5915 48.4658 12.9239 48.4658 11.8949C48.4658 10.8658 49.154 10.1982 50.1534 10.1982C51.1528 10.1982 51.841 10.8658 51.841 11.8949ZM50.1534 22.8245C45.3435 22.8245 41.5173 18.7844 41.5173 11.8949C41.5173 4.96299 45.3435 1.02734 50.1534 1.02734C54.9633 1.02734 58.7472 4.96299 58.7472 11.8949C58.7472 18.7844 54.9633 22.8245 50.1534 22.8245Z" fill="#002244"/>
      <path d="M78.6942 9.30872V1.02734H85.8979V22.613H78.6942V14.1201C78.6942 13.091 78.6942 12.062 78.6942 10.9907C78.6519 10.1508 78.4425 9.56208 77.769 9.17721C77.0955 8.79234 76.2104 8.79234 75.3675 9.135L70.5576 10.8142V2.8858L78.6942 9.30872Z" fill="#002244"/>
      <path d="M63.7383 1.02734H70.942V22.613H63.7383V1.02734Z" fill="#002244"/>
      <path d="M93.3039 1.02734H100.508V22.613H93.3039V1.02734Z" fill="#002244"/>
      <path d="M101.455 1.02734H110.384L105.107 11.8949L110.173 22.613H101.58L98.636 16.3421H93.1345V22.613H85.9308V1.02734H98.4665C99.4659 1.02734 100.351 1.54188 100.815 2.43962C101.279 3.33736 101.279 4.40871 100.815 5.30645C100.351 6.20419 99.4659 6.71873 98.4665 6.71873H93.1345V10.1135H97.7497L101.455 1.02734Z" fill="#46C8F5"/>
      <path d="M40.2458 31.5208L34.1171 25.8624L40.2458 31.5208Z" fill="#46C8F5"/>
      <path d="M40.542 31.2417L34.1171 25.2842L40.542 31.2417Z" fill="#46C8F5"/>
      <path d="M34.1171 25.2842L40.5843 31.2839L34.1171 25.2842Z" fill="#46C8F5"/>
      <path d="M40.5843 31.2839L34.1171 25.2842L40.5843 31.2839Z" fill="#46C8F5"/>
      <path d="M34.1171 25.2842L40.542 31.2417L34.1171 25.2842Z" fill="#46C8F5"/>
      <path d="M40.542 31.2417L34.1171 25.2842L40.542 31.2417Z" fill="#46C8F5"/>
      <path d="M34.1171 25.2842L40.2458 31.5208L34.1171 25.2842Z" fill="#46C8F5"/>
      <path d="M40.2458 31.5208L34.1171 25.2842L40.2458 31.5208Z" fill="#46C8F5"/>
      <path d="M40.2035 25.0938H33.8208L40.2035 25.0938Z" fill="#46C8F5"/>
      <path d="M40.2035 25.0938H33.8208" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M45.5426 25.0938H41.6885" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M45.416 31.5208L40.2458 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40.542 31.2417L34.1171 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M49.4912 31.5208H55.8739" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M52.6826 31.5208V25.2419" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M59.3204 31.5208H65.7031" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M62.5118 31.5208V25.2419" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M69.0494 28.3813C69.0494 26.5925 70.472 25.2419 72.1866 25.2419H73.0336C74.7482 25.2419 76.1708 26.5925 76.1708 28.3813V31.5208H69.0494V28.3813Z" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M80.0197 25.2419H78.291V31.5208H80.0197V25.2419Z" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M86.317 31.5208L81.1467 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M81.4258 31.2417L87.8507 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90.3113 25.2419V31.5208" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90.3113 27.5029H93.3039" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M95.6698 25.2419L99.6384 31.5208L103.607 25.2419" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M123.148 11.8949C123.148 12.9239 122.46 13.5915 121.461 13.5915C120.461 13.5915 119.773 12.9239 119.773 11.8949C119.773 10.8658 120.461 10.1982 121.461 10.1982C122.46 10.1982 123.148 10.8658 123.148 11.8949ZM121.461 22.8245C116.651 22.8245 112.825 18.7844 112.825 11.8949C112.825 4.96299 116.651 1.02734 121.461 1.02734C126.271 1.02734 130.055 4.96299 130.055 11.8949C130.055 18.7844 126.271 22.8245 121.461 22.8245Z" fill="#002244"/>
    </svg>
);


export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-gray-50/50 w-full">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <NovainLogo />
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="#" className="text-foreground">Home</Link>
                <Link href="#" className="text-muted-foreground">Blog</Link>
                <Link href="#" className="text-muted-foreground">About Us</Link>
                <Link href="#" className="text-muted-foreground">Contact Us</Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button style={{ backgroundColor: '#D90067', color: 'white' }} className="rounded-full px-4 sm:px-6">
                Emergency
              </Button>
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Tosin Chukwuka" data-ai-hint="woman portrait" />
                        <AvatarFallback>TC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Tosin Chukwuka</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          tosin.c@novain.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Change Password</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </header>
          <div className="flex flex-1">
            <Sidebar className="bg-white border-r" collapsible="icon">
                <SidebarContent className="p-2">
                    <SidebarMenu>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Home" isActive={pathname === '/patients/dashboard'}>
                                 <Home />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Appointments">
                                <Calendar />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Doctors">
                                <Users />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Medical Records">
                                <Briefcase />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Lab Tests">
                                <FlaskConical />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Messages">
                                <MessageSquare />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Profile Settings">
                                <User />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Referrals">
                                <Share />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Change Password">
                                <Lock />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu className="p-2">
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Logout">
                                <LogOut />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset className="flex-1 flex flex-col">
              <div className="bg-primary text-primary-foreground py-4 px-6">
                <p className="text-sm">Home / Dashboard</p>
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>
              <main className="flex-1 p-4 sm:p-6">{children}</main>
            </SidebarInset>
          </div>
      </div>
    </SidebarProvider>
  );
}
