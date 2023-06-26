import { ResumeEditor } from "@/components/modules/resume"
import { getAccount, getUser } from "@/lib/db"
import { ResumeFormValues } from "@/components/modules/resume/types"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { renderResumeTemplate } from "@/lib/templates"
import { createResume } from "@/lib/open-ai"
import { GithubProfile } from "next-auth/providers/github"

export default async function ResumePage() {
  const userSession = await getCurrentUser()

  if (!userSession) {
    redirect(`/login`)
  }

  const user = await getUser()
  const userId = user?.id
  const account = userId ? await getAccount(userId) : null
  const profileData = account?.profileData
  const resumeData = (profileData ? await createResume(profileData as GithubProfile) : undefined) as (ResumeFormValues | undefined)
  const resumeHtmlString = resumeData ? renderResumeTemplate(resumeData) : ''

  return (
    <ResumeEditor email={userSession.email} defaultValues={resumeData} templateHtml={resumeHtmlString}/>
  )
}
