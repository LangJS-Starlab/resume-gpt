import { Resume } from "@/components/modules/resume"
import { UseQueryOptions, useQuery } from "react-query"

type ResumeTemplateResponse = {
  data: Resume
}

export const useResumeTemplate = (options: UseQueryOptions<ResumeTemplateResponse>) => {
  return useQuery<ResumeTemplateResponse>("resumeTemplate", async () => {
    const res = await fetch(`/resume/api`)
    const data = await res.json() as ResumeTemplateResponse
    return data
  }, options)
}