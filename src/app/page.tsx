"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {authClient} from "@/lib/auth-client";

export default function Home() {

   const {
        data: session                   //Once a user is signed in, you'll want to access the user session. BetterAuth
    } = authClient.useSession()         //allows you easily to access the session data from the server and client side.

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");

   const onSubmit = async ()=>{
       try {
          console.log("Starting sign up...", { email, name });
          const {data, error}= await authClient.signUp.email({
            email,
            password,
            name,
         },
         {
            onError: (status) =>{
               console.error("Sign up error:", status);
               alert("something went wrong");
               alert(status.error.message);
            },
            onSuccess: (status) =>{
               console.log("Sign up success:", status);
               alert("redirecting to the homepage!");
            },
            onRequest: (status) =>{
               console.log("Request status:", status);
            }
         });

         if (error) {
            console.error("Sign up failed:", error);
            alert(`Sign up failed: ${error.message}`);
         } else if (data) {
            console.log("Sign up successful:", data);
         }
       } catch (err) {
          console.error("Unexpected error:", err);
          alert(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`);
       }
   }

      const onLogin = async ()=>{
       try {
          console.log("Starting sign up...", { email, name });
          const {data, error}= await authClient.signIn.email({
            email,
            password
         },
         {
            // onError: (status) =>{
            //    console.error("Sign up error:", status);
            //    alert("something went wrong");
            //    alert(status.error.message);
            // },
            onSuccess: (status) =>{
               console.log("Sign up success:", status);
               alert("redirecting to the homepage!");
            },
            onRequest: (status) =>{
               console.log("Request status:", status);
            }
         });

         if (error) {
            console.error("Sign in failed:", error);
            alert(`Sign in failed: ${error.message}`);
         } else if (data) {
            console.log("Sign in successful:", data);
         }
       } catch (err) {
          console.error("Unexpected error:", err);
          alert(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`);
       }
   }

   if(session){
      return(
         <div className="flex flex-col p-4 gap-y-4">
            <p>Logged in as {session.user.name}</p>
            <Button onClick={()=>{authClient.signOut()}}>SignOut</Button>
         </div>
      )
   }

   return (
      // <Button>click me</Button>
      <div className= "flex flex-col gap-y-10">
         <div className="p-4 flex flex-col gap-4">
            <Input
               placeholder="Name"
               value={name}
               onChange={(e)=>{setName(e.target.value)}}
            />
            <Input
               placeholder="Email"
               value={email}
               onChange={(e)=>{setEmail(e.target.value)}}
            />
                     <Input
               placeholder="password"
               type="password"
               value={password}
               onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Button onClick={onSubmit}>
               Create User!!
            </Button>
         </div>
         <div className="p-4 flex flex-col gap-4">
            {/* <Input
               placeholder="Name"
               value={name}
               onChange={(e)=>{setName(e.target.value)}}
            /> */}
            <Input
               placeholder="Email"
               value={email}
               onChange={(e)=>{setEmail(e.target.value)}}
            />
                     <Input
               placeholder="password"
               type="password"
               value={password}
               onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Button onClick={onLogin}>
               Login
            </Button>
         </div>
      </div>

   )
}
