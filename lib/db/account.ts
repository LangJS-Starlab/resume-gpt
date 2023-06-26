import { UserId } from "@/types/next-auth";
import { Account, User } from "next-auth";
import { GithubProfile } from "next-auth/providers/github";
import { db } from "./db";

export const createAccount = async (account: Account | null, user: User, profile: GithubProfile) => {
  if (!account) {
    return;
  }
  
  const dbAccount = await db.account.findFirst({
    where: {
      provider: account.provider,
      providerAccountId: account.providerAccountId,
    },
  })

  if (dbAccount) {
    return;
  }

  await db.account.create({
    data: {
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      type: account.type,
      userId: user.id,
      profileData: profile
    }
  })
}

export const getAccount = async (id: UserId) => {
  const account = await db.account.findFirst({
    where: {
      userId: id,
    },
  })

  return account
}