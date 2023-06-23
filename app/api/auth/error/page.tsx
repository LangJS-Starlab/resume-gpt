import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Error",
  description: "Error page",
}

export default function ErrorPage(props: {}) {
  return (
    <>
      <p>error</p>
    </>
  )
}