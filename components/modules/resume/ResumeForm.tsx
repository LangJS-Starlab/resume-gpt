import React from 'react';
import { CertificateSection } from './CertificateSection';
import { EducationSection } from './EducationSection';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { ProjectSection } from './ProjectSection';
import { ReferenceSection } from './ReferenceSection';
import { CvFormValues } from './types';
import { WorkExperienceSection } from './WorkExperienceSection';

type ResumeFormProps = {
  defaultValues?: CvFormValues
  email?: string | null
  templateHtml?: string
}

export const ResumeForm = ({ defaultValues, email, templateHtml }: ResumeFormProps) => {
  return (
    <form>
      <PersonalDetailsSection />
      <WorkExperienceSection />
      <EducationSection />
      <ProjectSection />
      <CertificateSection />
      <ReferenceSection />
    </form>
  );
};
