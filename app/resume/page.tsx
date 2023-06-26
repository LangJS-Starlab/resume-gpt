import { ResumeEditor } from "@/components/modules/resume"
import { getAccount, getUser, updateUserResumeData } from "@/lib/db"
import { ResumeFormValues } from "@/components/modules/resume/types"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { createResume } from "@/lib/open-ai"
import { GithubProfile } from "next-auth/providers/github"

export default async function ResumePage() {
  const userSession = await getCurrentUser()

  if (!userSession) {
    redirect(`/login`)
  }

  const user = await getUser()
  const resumeData = user?.resumeData as (ResumeFormValues | undefined)
  const userId = user?.id
  const account = userId ? await getAccount(userId) : null
  const profileData = account?.profileData
  if (profileData && !resumeData) {
    createResume(profileData as GithubProfile).then(data => {
      data && updateUserResumeData(data, userId)
    }).catch(err => {
      console.error("🚀 ~ file: page.tsx:26 ~ createResume ~ err:", err)
    })
  }

  return (
    <ResumeEditor email={userSession.email} defaultValues={resumeData}/>
  )
}
