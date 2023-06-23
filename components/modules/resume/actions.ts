'use server'

import { CvFormValues } from "./types"
import { updateUserResumeData } from '@/lib/db';
 
export async function updateResume(email: string , values: CvFormValues) {
  await updateUserResumeData(email, values)
}
