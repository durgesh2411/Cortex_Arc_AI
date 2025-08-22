"use client";
import { Button } from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export const HomeView = ()=>{

   return (
      <div >
         home view
      </div>
   )
}
