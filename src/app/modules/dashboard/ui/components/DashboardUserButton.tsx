import {authClient} from "@/lib/auth-client";
import{
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import{
   Drawer,
   DrawerTrigger,
   DrawerContent,
   DrawerHeader,
   DrawerFooter,
   DrawerDescription,
   DrawerTitle,
   DrawerClose
} from "@/components/ui/drawer";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
   const router = useRouter();
   const {data, isPending } = authClient.useSession()
   const [mounted, setMounted] = useState(false)
   const isMobile = useIsMobile();

   useEffect(() => {
      setMounted(true)
   }, [])

   const onLogOut = () =>{
        authClient.signOut({
         fetchOptions:{
            onSuccess: () => {
               // Handle successful logout
               router.push("/sign-in");
            },
            onError: (error) => {
               // Handle logout error
            }
         }
      })
   }

   if(isPending || !data?.user) return null

   // Don't render mobile-specific content until mounted to avoid hydration issues
   if (!mounted) {
      return (
         <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg p-3 w-full flex items-center justify-between bg-sidebar-muted/20 hover:bg-sidebar-accent/60 transition-colors duration-200 overflow-hidden">
               <div className="flex items-center gap-3">
                  {data.user.image ? (
                     <Avatar className="size-7">
                        <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
                        <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                           {data.user.name?.charAt(0).toUpperCase() || data.user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                     </Avatar>
                  ) : (
                     <GeneratedAvatar
                        seed={data.user.name || data.user.email || "user"}
                        variant="initials"
                        className="size-9 mr-3"
                     />
                  )}
                  <div className="flex flex-col gap-0.7 text-left overflow-hidden flex-1 min-w-0">
                     <p className=" truncate w-full">
                        {data.user.name?.toUpperCase() || "User"}
                     </p>
                  </div>
               </div>
               <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
               <DropdownMenuLabel>Loading...</DropdownMenuLabel>
            </DropdownMenuContent>
         </DropdownMenu>
      )
   }

   return (
       <div>
         {isMobile ? (
            <Drawer>
               <DrawerTrigger className="rounded-lg p-3 w-full flex items-center justify-between bg-sidebar-muted/20 hover:bg-sidebar-accent/60 transition-colors duration-200 overflow-hidden">
                  <div className="flex items-center gap-3">
                     {data.user.image ? (
                        <Avatar className="size-7">
                           <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
                           <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                              {data.user.name?.charAt(0).toUpperCase() || data.user.email?.charAt(0).toUpperCase() || "U"}
                           </AvatarFallback>
                        </Avatar>
                     ) : (
                        <GeneratedAvatar
                           seed={data.user.name || data.user.email || "user"}
                           variant="initials"
                           className="size-9 mr-3"
                        />
                     )}
                     <div className="flex flex-col gap-0.7 text-left overflow-hidden flex-1 min-w-0">
                        <p className=" truncate w-full">
                           {data.user.name?.toUpperCase() || "User"}
                        </p>
                     </div>
                  </div>
                  <ChevronDownIcon className="size-4 shrink-0"/>
               </DrawerTrigger>
               <DrawerContent>
                  <DrawerHeader>
                     <DrawerTitle className="flex items-center gap-3">
                        {data.user.image ? (
                           <Avatar className="size-10">
                              <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
                              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                                 {data.user.name?.charAt(0).toUpperCase() || data.user.email?.charAt(0).toUpperCase() || "U"}
                              </AvatarFallback>
                           </Avatar>
                        ) : (
                           <GeneratedAvatar
                              seed={data.user.name || data.user.email || "user"}
                              variant="initials"
                              className="size-10"
                           />
                        )}
                        <div className="text-left">
                           <p className="font-medium">{data.user.name}</p>
                           <p className="text-sm text-muted-foreground">{data.user.email}</p>
                        </div>
                     </DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 space-y-2">
                     <Button
                        variant="ghost"
                        className="w-full justify-between h-12"
                        size="lg"
                     >
                        Billing
                        <CreditCardIcon className="size-4" />
                     </Button>
                     <Button
                        variant="ghost"
                        className="w-full justify-between h-12 text-destructive hover:text-destructive"
                        size="lg"
                        onClick={onLogOut}
                     >
                        Log out
                        <LogOutIcon className="size-4" />
                     </Button>
                  </div>
                  <DrawerFooter>
                     <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                     </DrawerClose>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         ) : (
            <DropdownMenu>
               <DropdownMenuTrigger className="rounded-lg p-3 w-full flex items-center justify-between bg-sidebar-muted/20 hover:bg-sidebar-accent/60 transition-colors duration-200 overflow-hidden">
                  <div className="flex items-center gap-3">
                     {data.user.image ? (
                        <Avatar className="size-7">
                           <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
                           <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                              {data.user.name?.charAt(0).toUpperCase() || data.user.email?.charAt(0).toUpperCase() || "U"}
                           </AvatarFallback>
                        </Avatar>
                     ) : (
                        <GeneratedAvatar
                           seed={data.user.name || data.user.email || "user"}
                           variant="initials"
                           className="size-9 mr-3"
                        />
                     )}
                     <div className="flex flex-col gap-0.7 text-left overflow-hidden flex-1 min-w-0">
                        <p className=" truncate w-full">
                           {data.user.name?.toUpperCase() || "User"}
                        </p>
                     </div>
                  </div>
                  <ChevronDownIcon className="size-4 shrink-0"/>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" side="right" className="w-72">
                  <DropdownMenuLabel>
                     <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                      Billing
                     <CreditCardIcon className="size-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     onClick={onLogOut}
                     className="cursor-pointer flex items-center justify-between">
                     Log out
                     <LogOutIcon className="size-4" />
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )}
       </div>
   )
}
