import { ResumeFormValues } from "@/components/modules/resume"
import { theme } from "./caffeine"

export function renderResumeTemplate(resume: ResumeFormValues) {
  const html = theme.render(resume)
  return html
}