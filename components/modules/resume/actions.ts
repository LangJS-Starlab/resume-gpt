'use server'

import { ResumeFormValues } from "./types"
import { updateUserResumeData } from '@/lib/db';
 
export async function updateResume(values: ResumeFormValues) {
  await updateUserResumeData(values)
}
