// Make sure the Card component exists at the correct path, e.g.:
import { Card } from "@/components/ui/card";
import { SignInView } from "@/app/modules/auth/ui/views/sign-in-view";
const page = () =>{
   // return(

   //       <Card>
   //          Sign in
   //       </Card>
   // )
   console.log("sign in page");
   return <SignInView />
}

export default page;  // important for routing
