import { z } from 'zod';
import { ResumeSchema } from './schema';

export type Resume = z.infer<typeof ResumeSchema>;

export type ResumeFormValues = Resume;

export interface ResumeTheme {
  render(resume: Resume): string
}