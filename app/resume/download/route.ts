// import { Resume } from '@/components/modules/resume'
// import { getUser } from '@/lib/db'
// import { renderResumeTemplate } from '@/lib/templates'
// import puppeteer from 'puppeteer';
 
export async function GET() {
  return new Response('Not Found', { status: 404 })
  // const user = await getUser()
  // const resumeData = user?.resumeData as Resume
  // const resumeHtmlData = renderResumeTemplate(resumeData)

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.setContent(resumeHtmlData);
  // const pdfBuffer = await page.pdf({
  //   format: 'A4',
  // });
  // await browser.close();
  // return new Response(pdfBuffer, {
  //   headers: {
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'attachment; filename=resume.pdf',
  //   },
  // });
}