// Make sure the Card component exists at the correct path, e.g.:
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {headers} from "next/headers";
import { SignInView } from "@/app/modules/auth/ui/views/sign-in-view";
const page = async () => {
   // return(

   //       <Card>
   //          Sign in
   //       </Card>
   // )
   console.log("sign in page");
   const session = await auth.api.getSession({
      headers: await headers()
   });

   if(!!session){
      redirect("/")
      }
   return <SignInView />
}

export default page;  // important for routing
