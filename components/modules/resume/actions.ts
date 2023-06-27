'use server'

import { Resume, ResumeFormValues } from "./types"
import { updateUserResumeData } from '@/lib/db';
import { UserId } from "@/types/next-auth";
import { renderResumeTemplate } from "@/lib/templates";
 
export async function updateResume(values: ResumeFormValues) {
  const resumeData = await updateUserResumeData(values) as Resume
  const templateHtml = renderResumeTemplate(resumeData)
  return {
    resumeData,
    templateHtml
  }
}
