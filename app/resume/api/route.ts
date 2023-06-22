import { CV } from '@/components/modules/resume'
import { getUser } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { renderResumeTemplate } from '@/lib/templates'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const userSession = await getCurrentUser()
  const user = userSession?.email ? await getUser(userSession.email) : null
  const resumeData = user?.resumeData as CV
  const resumeHtmlData = renderResumeTemplate(resumeData)
 
  return NextResponse.json({ data: resumeHtmlData  })
}