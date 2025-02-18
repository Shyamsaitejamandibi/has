import NextAuth from "next-auth";
import db from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  providers: [
    Resend({
      from: "Shyam <shyam@shyamsaiteja.tech>",
    }),
  ],
});
