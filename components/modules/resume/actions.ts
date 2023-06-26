'use server'

import { ResumeFormValues } from "./types"
import { updateUserResumeData } from '@/lib/db';
import { UserId } from "@/types/next-auth";
 
export async function updateResume(id: UserId, values: ResumeFormValues) {
  await updateUserResumeData(values, id)
}
