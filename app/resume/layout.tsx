import { SiteHeader } from "@/components/SiteHeader"

type ResumeLayoutProps = {
    children: React.ReactNode
  }
  
export default function ResumeLayout({ children }: ResumeLayoutProps) {
  return (
    <div>
      <SiteHeader/>
      {children}
    </div>)
}