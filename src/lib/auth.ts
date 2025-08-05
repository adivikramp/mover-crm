import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/utils";
import { UserModel } from "./models";

declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user?: {
            id?: string;
            role?: string;
            email?: string;
            name?: string;
        };
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    await connectDB();

                    const user = await UserModel.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password as string
                    );

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
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
    pages: {
        signIn: "/login",
        newUser: "/register",
    },
    secret: process.env.AUTH_SECRET,
});