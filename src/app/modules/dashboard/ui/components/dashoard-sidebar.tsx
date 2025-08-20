"use client";
import {
   Sidebar,
   SidebarTrigger,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";

import { VideoIcon, BotIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { labelDayButton } from "react-day-picker";
import {cn} from "@/lib/utils";
import { use } from "react";
import {usePathname} from "next/navigation";
import {DashboardUserButton} from "@/app/modules/dashboard/ui/components/DashboardUserButton";

const firstSection =[
   {
      icon: VideoIcon,
      label: "Meeting",
      href: "/meetings"
   },
   {
      icon: BotIcon,
      label: "Agents",
      href: "/agents"
   }
]

const secondSection =[

   {
      icon: StarIcon,
      label: "Upgrade",
      href: "/upgrade"
   }
]

export const DashboardSidebar = () => {
   const pathName = usePathname();
   return (
      <Sidebar className="bg-sidebar-background border-sidebar-border">
         <SidebarHeader className="text-sidebar-foreground bg-sidebar-background">
            <Link href="/" className="flex items-center gap-2 px-2 pt-2">
               <Image src="/logo.svg" alt="Logo" height={36} width={36} />
               <p className="text-2xl font-semibold">CortexArc AI</p>
            </Link>
         </SidebarHeader>
         <div className="px-4 py-2">
            <Separator className="bg-sidebar-border/20 h-px" />
         </div>
         <SidebarContent className="bg-sidebar-background">
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {firstSection.map((items) =>(
                        <SidebarMenuItem key={items.href}>

                           <SidebarMenuButton asChild className={cn(
                              "h-10 border-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              pathName === items.href && "bg-sidebar-primary text-sidebar-primary-foreground"
                           )} isActive={pathName === items.href}>
                              <Link href={items.href} className="flex items-center gap-3">
                                 <items.icon className="size-5"/>
                                 <span className="text-sm font-medium tracking-tight">
                                    {items.label}
                                 </span>
                              </Link>
                           </SidebarMenuButton>

                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

               <div className="px-4 py-2">
                  <Separator className="bg-sidebar-border/20 h-px" />
               </div>

            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {secondSection.map((items) =>(
                        <SidebarMenuItem key={items.href}>

                           <SidebarMenuButton asChild className={cn(
                              "h-10 border-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              pathName === items.href && "bg-sidebar-primary text-sidebar-primary-foreground"
                           )} isActive={pathName === items.href}>
                              <Link href={items.href} className="flex items-center gap-3">
                                 <items.icon className="size-5"/>
                                 <span className="text-sm font-medium tracking-tight">
                                    {items.label}
                                 </span>
                              </Link>
                           </SidebarMenuButton>

                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter className="text-white">
           <DashboardUserButton />
         </SidebarFooter>
      </Sidebar>
   )
}
