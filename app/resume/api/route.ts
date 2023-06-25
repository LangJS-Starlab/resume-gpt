import { CV } from '@/components/modules/resume'
import { getUser } from '@/lib/db'
import { renderResumeTemplate } from '@/lib/templates'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const user = await getUser()
  const resumeData = user?.resumeData as CV
  const resumeHtmlData = renderResumeTemplate(resumeData)
 
  return NextResponse.json({ data: resumeHtmlData  })
}