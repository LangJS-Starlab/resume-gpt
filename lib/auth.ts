import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  env
} from '@/env.mjs';
import { createAccount, createUser, db } from "./db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user user" },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: '/login'
  },
  callbacks: {
    async signIn ({user, account, profile}) {
      const newUser = await createUser(user, profile)
      await createAccount(account, newUser)
      
      return true
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
