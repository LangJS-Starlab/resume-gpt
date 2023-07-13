import { Resume } from "@/components/modules/resume"
import { UseQueryOptions, useQuery } from "react-query"

type ResumeDetailsResponse = Resume

type ResumePdfResponse = {
  data: string
}

export const useResumeDetails = (options: UseQueryOptions<ResumeDetailsResponse>) => {
  return useQuery<ResumeDetailsResponse>("resumeDetails", async () => {
    const res = await fetch(`/resume/data`)
    const data = await res.json()
    return data.resumeData
  }, options)
}

export const useResumePdf = (options: UseQueryOptions<ResumePdfResponse>) => {
  return useQuery<ResumePdfResponse>("resumeDownload", async () => {
    const res = await fetch(`/resume/download`)
    const data = await res.json()
    return data
  }, options)
}