import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/libs/mongodb";
import mongoose from "mongoose";
import { compareSync } from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectMongoDB();
          const user = await mongoose.connection.db
            .collection("users")
            .findOne({
              mail: credentials.email,
            });

          if (!user) return null;

          // const { hashSync } = require("bcryptjs");
          // const newPassword = hashSync(user.password, 10);
          // console.log("🔑* newPassword :", newPassword);

          const isValid = compareSync(credentials.password, user.password);
          console.log("isValid :", isValid);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.mail,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
