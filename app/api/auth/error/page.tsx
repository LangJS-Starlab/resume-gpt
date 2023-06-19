import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Error",
  description: "Error page",
}

export default function ErrorPage(props: {}) {
  console.log("🚀 ~ file: page.tsx:12 ~ ErrorPage ~ props:", props)
  return (
    <>
      <p>error</p>
    </>
  )
}