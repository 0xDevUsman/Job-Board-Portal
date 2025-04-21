import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import User from "@/models/user"; // Mongoose model for users
import { dbConnect } from "@/lib/db"; // MongoDB connection

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );
        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.firstname,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      console.log("db connected");
      if (account?.provider !== "credentials") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // If user does not exist, create a new one
          const nameParts = user.name?.split(" ") || ["Unknown"];
          const newUser = new User({
            firstname: nameParts[0],
            lastname: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
            email: user.email,
            provider: account!.provider,
          });
          try {
            console.log("New User Object: ", newUser);
            await newUser.save();
            console.log("User saved successfully.");
          } catch (error) {
            console.error("Error saving user:", error);
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        await dbConnect();

        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role[0];
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
