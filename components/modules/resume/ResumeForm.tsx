'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';
import { CertificateSection } from './CertificateSection';
import { EducationSection } from './EducationSection';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { ProjectSection } from './ProjectSection';
import { ReferenceSection } from './ReferenceSection';
import { CVSchema } from './schema';
import { CvFormValues } from './types';
import { WorkExperienceSection } from './WorkExperienceSection';
import { updateResume } from './actions';

type ResumeFormProps = {
  defaultValues?: CvFormValues
  email?: string | null
  templateHtml?: string
}

export const ResumeForm = ({ defaultValues, email, templateHtml }: ResumeFormProps) => {
  const [_, startUpdateTemplateTransition] = React.useTransition()

  const formReturn = useForm<CvFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CVSchema),
  });

  console.log(formReturn.formState.isValid)

  const handleDebounceUpdateResume = (data: CvFormValues) => {
    if (!email || !data) {
      return
    }
    startUpdateTemplateTransition(() => updateResume(email, data))
  }

  const debounceUpdateResume = React.useCallback(debounce(handleDebounceUpdateResume, 500), []);

  React.useEffect(() => {
    formReturn.watch((data) => {
      if (!email || !data) {
        return
      }
      debounceUpdateResume(data as CvFormValues)
    })
  }, [debounceUpdateResume, email, formReturn])

  return (
    <>
      <FormProvider {...formReturn}>
        <form>
          <PersonalDetailsSection />
          <WorkExperienceSection />
          <EducationSection />
          <ProjectSection />
          <CertificateSection />
          <ReferenceSection />
        </form>
      </FormProvider>
    </>
  );
};
