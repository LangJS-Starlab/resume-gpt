import { Resume } from '@/components/modules/resume'
import { getUser } from '@/lib/db'
import { renderResumeTemplate } from '@/lib/templates'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const user = await getUser()
  const resumeData = user?.resumeData as Resume
  const resumeHtmlData = renderResumeTemplate(resumeData)
 
  return NextResponse.json({ resumeHtmlData: resumeHtmlData, resumeData  })
}