import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // Import the schema

export const auth = betterAuth({
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
