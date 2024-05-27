import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/../utils/mongodb";
import USER from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email.", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password required");
        }
        await connectDB();

        // Add logic here to look up the user from the credentials supplied
        const user: any = await USER.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error("User not found");
        }
        const isTrue = await bcrypt.compare(
          credentials?.password,
          user?.password
        );

        if (isTrue) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Incorrect password");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Add user data to the token
      if (user) {
        const { password, ...userWithoutPassword } = user._doc;
        token.user = userWithoutPassword;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add token data to the session
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.JWT_SECRET_KET,
  },
  secret: process.env.NEXT_AUTH_SECRET_KET,
};

const getUserByEmail = async (email: any) => {
  const user = await USER.findOne({ email });
  return user;
};

export default NextAuth(authOptions);
