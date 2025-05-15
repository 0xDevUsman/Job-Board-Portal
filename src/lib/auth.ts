import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import User from "@/models/user"; // Mongoose model
import { dbConnect } from "@/lib/db";

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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: `${user.firstname} ${user.lastname ?? ""}`.trim(),
          email: user.email,
          role: user.role[0], // Ensure the role is included
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;

      await dbConnect();

      if (account?.provider !== "credentials") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const nameParts = user.name?.split(" ") || ["Unknown"];
          const newUser = new User({
            firstname: nameParts[0],
            lastname: nameParts.slice(1).join(" "),
            email: user.email,
            provider: account?.provider,
          });

          try {
            await newUser.save();
          } catch (error) {
            console.error("Error saving new OAuth user:", error);
            return false;
          }
        }
      }

      return true;
    },

    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        // Handle session updates
        return { ...token, ...session.user };
      }

      if (!token?.email) return token;
      await dbConnect();
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) {
        token.id = dbUser._id.toString();
        token.name = `${dbUser.firstname} ${dbUser.lastname ?? ""}`.trim();
        token.email = dbUser.email;
        token.role = dbUser.role[0];
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
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
