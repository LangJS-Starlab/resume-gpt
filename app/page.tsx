import { SiteHeader } from "@/components/SiteHeader"
import { FeatureItems } from "@/components/modules/home/FeatureItems"
import { HeroBannerImage } from "@/components/modules/home/HeroBannerImage"
import { buttonVariants } from "@/components/ui/Button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default async function IndexPage() {
  return (
    <>
      <SiteHeader />
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
           Resume GPT
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create a perfect resume in seconds and land your dream job with Resume GPT.
          </p>
          <div className="space-x-4">
            <Link href="/resume" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <HeroBannerImage/>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern web app, with features
            like auth, route handlers, server actions, and static pages would work in
            Next.js 13 app router.
          </p>
        </div>
        <FeatureItems/>
      </section>
    </>
  )
}
