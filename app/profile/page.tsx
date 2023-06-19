import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Profile() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login`)
  }

  return (
    <>
      <p>profile</p>
    </>
  )
}