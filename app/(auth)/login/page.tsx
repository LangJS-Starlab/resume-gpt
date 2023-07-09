import { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { UserAuthForm } from "@/components/modules/auth"
import { Icons } from "@/components/Icons"
import { getCurrentUser } from "@/lib/session"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect(`/resume`)
  }

  return (
    <>
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                  "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="inline-block font-bold">{siteConfig.name}</span>
            </Link>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                  Start building your resume today for free with the help of our AI powered builder.
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}