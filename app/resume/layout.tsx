import { SiteHeader } from "@/components/SiteHeader"

type ResumeLayoutProps = {
    children: React.ReactNode
  }
  
export default function ResumeLayout({ children }: ResumeLayoutProps) {
  return (
    <div>
      {/*Async Component ts issue: https://github.com/vercel/next.js/issues/42292*/}
      {/* @ts-expect-error Server Component: */}
      <SiteHeader/>
      {children}
    </div>)
}