// Make sure the Card component exists at the correct path, e.g.:
import {SignUpView} from "@/app/modules/auth/ui/views/sign-up-view";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
const page = async () => {
   console.log("sign up page");
   const session = await auth.api.getSession({
         headers: await headers()
      });

   if(!!session){
      redirect("/")
   }
   return <SignUpView />
}

export default page;  // important for routing
