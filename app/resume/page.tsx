import { ResumeEditor } from "@/components/modules/resume"
import { getUser } from "@/lib/db"
import { CvFormValues } from "@/components/modules/resume/types"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { renderResumeTemplate } from "@/lib/templates"

async function getUserData(email: string) {
  const res = await getUser(email)
  return res
}

export default async function IndexPage() {
  const userSession = await getCurrentUser()

  if (!userSession) {
    redirect(`/login`)
  }

  const userEmail = userSession?.email
  const user = userEmail ? await getUserData(userEmail) : null
  const resumeData = user?.resumeData as CvFormValues
  const resumeHtmlData = renderResumeTemplate(resumeData)

  return (
    <ResumeEditor email={userEmail} defaultValues={resumeData} templateHtml={resumeHtmlData}/>
  )
}
