"use client";

import {
  LayoutDashboard,
  PieChart,
  FileText,
  CreditCard,
  Users,
  MessageSquare,
  ArrowUp,
  User,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

const navigationItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    url: "#",
    isActive: true,
  },
  {
    title: "Financial Plan",
    icon: PieChart,
    url: "#",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "#",
  },
  {
    title: "Accounts",
    icon: CreditCard,
    url: "#",
  },
  {
    title: "HR Test",
    icon: Users,
    url: "#",
  },
  {
    title: "Chat AI",
    icon: MessageSquare,
    url: "#",
  },
  {
    title: "Upgrade",
    icon: ArrowUp,
    url: "#",
  },
];

const footerItems = [
  {
    title: "Profile",
    icon: User,
    url: "#",
  },
  {
    title: "Log Out",
    icon: LogOut,
    url: "#",
    variant: "destructive" as const,
  },
];

export function DashbaordSidebar() {
  return (
    <Sidebar className="border-r-0 bg-gradient-to-br from-[#16156C] to-[#080635]">
      <SidebarHeader className="py-6 px-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="text-white hover:bg-white hover:text-blue-900 data-[active=true]:bg-white data-[active=true]:text-blue-900"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarSeparator className="bg-gray-700 mb-4" />
        <SidebarMenu className="gap-5">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`text-white hover:text-blue-900${
                  item.variant === "destructive"
                    ? "hover:bg-red-600 text-red-300"
                    : "hover:bg-white"
                }`}
              >
                <a href={item.url} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
