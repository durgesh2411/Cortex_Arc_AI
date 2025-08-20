// Make sure the Card component exists at the correct path, e.g.:
import {SignUpView} from "@/app/modules/auth/ui/views/sign-up-view";
import { Card } from "@/components/ui/card";
const page = () =>{
   console.log("sign up page");
   return <SignUpView />
}

export default page;  // important for routing
