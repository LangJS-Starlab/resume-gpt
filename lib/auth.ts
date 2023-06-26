import { AuthOptions } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  env
} from '@/env.mjs';
import { createAccount, createUser, db, updateUserResumeData } from "./db";

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
      console.log("🚀 ~ file: auth.ts:30 ~ signIn ~ user:", user)
      if (account?.provider === 'github') {
        const newUser = await createUser(user)
        await createAccount(account, newUser, profile as GithubProfile)
        return true
      }

      throw new Error('Invalid provider')
    },
    async session({ token, session }) {
      console.log("🚀 ~ file: auth.ts:39 ~ session ~ session:", session)
      if (token && session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.id = token.id
      }
      return session
    },
    async jwt({ token, user }) {
      console.log("🚀 ~ file: auth.ts:49 ~ jwt ~ token:", token)
      console.log("🚀 ~ file: auth.ts:49 ~ jwt ~ user:", user)
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
