import { z } from 'zod';
import { CVSchema } from './schema';

export type CV = z.infer<typeof CVSchema>;

export type CvFormValues = CV;

export interface ResumeTheme {
  render(resume: CV): string
}