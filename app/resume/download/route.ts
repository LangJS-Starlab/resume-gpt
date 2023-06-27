import { Resume } from '@/components/modules/resume'
import { getUser } from '@/lib/db'
import { renderResumeTemplate } from '@/lib/templates'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const user = await getUser()
  const resumeData = user?.resumeData as Resume
  const resumeHtmlData = renderResumeTemplate(resumeData)
  const base64Data = `data:text/html;base64,${Buffer.from(decodeURIComponent(encodeURIComponent(resumeHtmlData)), 'utf-8').toString('base64')}`
  
  return NextResponse.json({
    data: base64Data
  })
}