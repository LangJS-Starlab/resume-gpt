import { Account, User } from "next-auth";
import { db } from "./db";

export const createAccount = async (account: Account | null, user: User) => {
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
    }
  })
}