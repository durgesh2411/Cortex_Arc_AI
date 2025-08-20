"use client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaGoogle, FaGithub} from "react-icons/fa";

//local imports:
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {Card} from "@/components/ui/card";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form"
import { auth } from "@/lib/auth";


const formSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6, {message: "Password is required" })
})

export const SignInView =()=>{
   const router = useRouter();
   const [error, setError] = useState<string | null>(null)
   const [pending, setPending] = useState<boolean>(false)

   const form = useForm<z.infer <typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: ""
      }
   })

   const onSubmit = async(data:z.infer<typeof formSchema>)=>{
      setError(null);
      setPending(true);
      const {error} = await authClient.signIn.email(
         {
         email: data.email,
         password: data.password,
         callbackURL: "/"
      },
      {
         onSuccess: ()=>{
            setPending(false);
            router.push("/");
            },
            onError: ({ error })=>{
               console.log("Error object:", error);
               // Handle different possible error structures
               const errorMessage = error?.error?.message ||
                                   error?.message ||
                                   "An error occurred during sign-in";
               setError(errorMessage);
            }
         }
      );
   };


   const onSocial = (provider: "google" | "github")=>{
      setError(null);
      setPending(true);
      authClient.signIn.social(
      {
         provider:provider,
         callbackURL: "/"
      },

      {
          onSuccess: ()=>{
          setPending(false);
          },
          onError: ({ error })=>{
               setPending(false);
               setError(error.message);
            }
         }
      );
   };





   return(
      <div className="flex flex-col gap-6" suppressHydrationWarning>
         <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2" suppressHydrationWarning>
               <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6" suppressHydrationWarning>
                           <div className="flex flex-col items-center text-center" suppressHydrationWarning>
                              <h1 className="text-2xl font-bold">
                                 Welcome back!
                              </h1>
                              <p className="text-muted-foreground text-balance">
                                 Login to your account.
                              </p>
                           </div>
                           <div className="grid gap-3" suppressHydrationWarning>
                              <FormField
                                 control = {form.control}
                                 name = "email"
                                 render = {({field}) =>(
                                    <FormItem>
                                       <FormLabel>Email</FormLabel>
                                       <FormControl>
                                          <Input
                                          type="email"
                                          placeholder="mail@gmail.com"
                                          {...field   }
                                           />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}

                              />
                           </div>
                           <div className="flex flex-col" suppressHydrationWarning>
                              <FormField
                                 control={form.control}
                                 name="password"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Password</FormLabel>
                                       <FormControl>
                                          <Input
                                             type="password"
                                             placeholder="••••••••"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           {!!error && (
                              <Alert className="bg-destructive/10 border-none">
                                 <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                 <AlertTitle>Error</AlertTitle>
                                 <AlertDescription>{error}</AlertDescription>
                              </Alert>
                           )}
                           <Button disabled={pending} type="submit" className="w-full">
                              Sign In
                           </Button>
                           <div className="after:border-border relative text-center text-small after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t" suppressHydrationWarning>
                              <span className="bg-card text-muted-foreground relative z-10 px-2">
                                  Or continue with
                              </span>
                           </div>
                           <div className="grid grid-cols-2 gap-4" suppressHydrationWarning>
                              <Button
                                 disabled={pending}
                                 variant="outline"
                                 type="button"
                                 onClick={ () => onSocial("google") }
                                 className="w-full">
                                 <FaGoogle/>
                              </Button>
                              <Button
                                 disabled={pending}
                                 variant="outline"
                                 type="button"
                                 onClick={ () => onSocial("github") }
                                 className="w-full">
                                 <FaGithub />
                              </Button>
                           </div>
                           <div className="text-center text-sm" suppressHydrationWarning>
                              Don&apos;t have an account?{"  "}
                              <Link href="/sign-up" className="underline underline-offset-4">
                                 Sign Up
                              </Link>
                           </div>
                        </div>
                     </form>
               </Form>
            <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center" suppressHydrationWarning>
               <img src="/logo.svg" alt="CortexArc.AI" className="h-[92px] w-[92px]" />
               <p className="text-2xl font-semibold text-white">CortexArc.AI</p>
            </div>
            </CardContent>
         </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4" suppressHydrationWarning>
         by clicking continue, you agree to our <a href="#">Terms of service</a> and <a href="#">Privacy policy</a>
      </div>
      </div>
   )
}
