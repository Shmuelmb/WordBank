import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID ? process.env.CLIENT_ID : "",
      clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : "",
    }),
  ],
};
