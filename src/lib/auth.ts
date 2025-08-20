import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // Import the schema

export const auth = betterAuth({

   socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

   emailAndPassword:{
      enabled: true,
      requireEmailVerification: false, // Disable for development
      minPasswordLength: 4, // Minimum 4 characters for easier testing
      maxPasswordLength: 128,
   },

   database: drizzleAdapter(db, {
       provider: "pg",
       schema: {
         ...schema, // Pass the schema directly
       },
   }),
});
