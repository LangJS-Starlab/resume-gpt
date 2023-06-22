import { UseQueryOptions, useQuery } from "react-query"

export const useResumeTemplate = (options: UseQueryOptions) => {
  return useQuery<any>("resumeTemplate", async () => {
    const res = await fetch(`/resume/api`)
    const data = await res.json()
    return data
  }, options)
}