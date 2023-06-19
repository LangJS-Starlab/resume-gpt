import { CvFormValues } from "@/components/modules/resume"
import { theme } from "./caffeine"

export function renderResumeTemplate(resume: CvFormValues) {
  const html = theme.render(resume)
  return html
}