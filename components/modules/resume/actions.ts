'use server'

import { ResumeFormValues } from "./types"
import { updateUserResumeData } from '@/lib/db';
 
export async function updateResume(email: string , values: ResumeFormValues) {
  await updateUserResumeData(email, values)
}
