import { ResumeFormValues } from "@/components/modules/resume";
// import { Prisma } from "@prisma/client";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { GithubProfile } from "next-auth/providers/github";
// import { createResume } from "../open-ai";
import { getCurrentUser } from "../session";
import { db } from "./db";

export const createUser = async (user: User | AdapterUser, profile?: GithubProfile) => {
  let dbUser = await db.user.findFirst({
    where: {
      email: user.email,
    },
  })

  if (!dbUser) {
    // const resumeData = profile ? await createResume(profile) : null
    dbUser = await db.user.create({
      data: {
        email: user.email,
        name: user.name,
        image: user.image,
        // should be Prisma.JsonObject but it's not working when building for now
        // resumeData: resumeData as any
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

export const updateUserResumeData = async (email: string, resumeData: ResumeFormValues) => {
  const user = await getCurrentUser()
  const dbUser = await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      resumeData: resumeData as any
    },
  })

  return dbUser.resumeData
}
