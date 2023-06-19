import { SiteHeader } from "@/components/SiteHeader"

type AuthLayoutProps = {
    children: React.ReactNode
  }
  
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <SiteHeader/>
      {children}
    </div>)
}