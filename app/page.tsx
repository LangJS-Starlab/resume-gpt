import { Flex } from "@/components/ui/Flex"
import { ResumeForm } from "@/components/modules/resume"
import { SiteHeader } from "@/components/SiteHeader"
import { getUser } from "@/lib/db"
import { CvFormValues } from "@/components/modules/resume/types"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { theme } from "@/lib/templates/caffeine"

async function getUserData(email: string) {
  const res = await getUser(email)
  return res
}

function renderResumeTemplate(resume: CvFormValues) {
  const html = theme.render(resume)
  return html
}

export default async function IndexPage() {
  const userSession = await getCurrentUser()

  if (!userSession) {
    redirect(`/login`)
  }

  const handleSubmit  = (values: CvFormValues) => {
    console.log(values)
  }

  const userEmail = userSession?.email
  const user = userEmail ? await getUserData(userEmail) : null
  const resumeData = user?.resumeData as CvFormValues

  return (
    <div>
      <SiteHeader/>
      <Flex className="container relative">
        <Flex className="flex-1">
          <div className="w-full">
            <div className="mx-auto py-4 lg:max-w-2xl">
              <ResumeForm defaultValues={resumeData} email={user?.email}/>
            </div>
          </div>
        </Flex>
        <Flex className="sticky right-0 top-12 h-screen flex-1 p-4">
          {user?.resumeData ? <div className="w-full" dangerouslySetInnerHTML={{__html: renderResumeTemplate(resumeData)}}/> : null}
        </Flex>
      </Flex>
    </div>
  )
}
