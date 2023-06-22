'use server'

import { CvFormValues } from "./types"
import { updateUserResumeData } from '@/lib/db';
import { revalidatePath } from "next/cache";

 
export async function updateResume(email: string , values: CvFormValues) {
  await updateUserResumeData(email, values)
  revalidatePath('/')
}
