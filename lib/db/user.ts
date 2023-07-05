import { ResumeFormValues } from "@/components/modules/resume";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { getCurrentUser } from "../session";
import { db } from "./db";

export const createUser = async (user: User | AdapterUser) => {
  let dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
    })
  }

  return dbUser
}

export const getUser = async () => {
  const user = await getCurrentUser()
  const dbUser = await db.user.findFirst({
    where: {
      id: user?.id,
    },
  })

  return dbUser
}

export const updateUserResumeData = async (resumeData: ResumeFormValues) => {
  const user = await getCurrentUser()
  const dbUser = await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      resumeData
    },
  })

  return dbUser.resumeData
}
