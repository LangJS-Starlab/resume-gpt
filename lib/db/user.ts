import { CvFormValues } from "@/components/modules/resume";
import { Prisma } from "@prisma/client";
import { Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { createResume } from "../open-ai";
import { db } from "./db";

export const createUser = async (user: User | AdapterUser, profile?: Profile) => {
  let dbUser = await db.user.findFirst({
    where: {
      email: user.email,
    },
  })

  if (!dbUser) {
    const resumeData = profile ? await createResume(profile) : null
    console.log("🚀 ~ file: user.ts:16 ~ createUser ~ resumeData:", resumeData)
    dbUser = await db.user.create({
      data: {
        email: user.email,
        name: user.name,
        image: user.image,
        resumeData: resumeData as Prisma.JsonObject
      },
    })
  }

  return dbUser
}

export const getUser = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  })

  return user
}

export const updateUserResumeData = async (email: string, resumeData: CvFormValues) => {
  const user = await db.user.update({
    where: {
      email,
    },
    data: {
      resumeData: resumeData as Prisma.JsonObject
    },
  })

  return user
}
