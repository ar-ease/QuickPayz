import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import db from "@repo/db/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // Remove the explicit type annotation and let NextAuth's types take precedence
    async signIn({ user, account }) {
      console.log("hi signin");

      // Add proper null/undefined checks
      if (!user || !user.email || !account) {
        return false;
      }

      try {
        await db.merchant.upsert({
          select: {
            id: true,
          },
          where: {
            email: user.email,
          },
          create: {
            email: user.email,
            name: user.name || "",
            auth_type: account.provider === "google" ? "Google" : "Github",
          },
          update: {
            name: user.name || "",
            auth_type: account.provider === "google" ? "Google" : "Github",
          },
        });
        return true;
      } catch (error) {
        console.error("Error upserting merchant:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
