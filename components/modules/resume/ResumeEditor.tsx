'use client';

import { FormDevTool } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';

import { CertificateSection } from './CertificateSection';
import { EducationSection } from './EducationSection';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { ProjectSection } from './ProjectSection';
import { ReferenceSection } from './ReferenceSection';
import { CVSchema } from './schema';
import { CvFormValues } from './types';
import { WorkExperienceSection } from './WorkExperienceSection';
import { updateResume } from './actions';
import { Flex } from '@/components/ui/Flex';

type ResumeEditorProps = {
  defaultValues?: CvFormValues
  email?: string | null
  templateHtml?: string
}

export const ResumeEditor = ({ defaultValues, email, templateHtml }: ResumeEditorProps) => {
  let [isPendingUpdateTemplate, startUpdateTemplateTransition] = React.useTransition()
  let [isPendingRenderTemplate, startRenderTemplateTransition] = React.useTransition()
  console.log('render')
  const formReturn = useForm<CvFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(CVSchema),
  });
  const { handleSubmit, watch, reset, formState } = formReturn;

  const onSubmit = React.useCallback((data: CvFormValues) => {
    if (!email) {
      return
    }

    startUpdateTemplateTransition(() => updateResume(email, data))
    reset(data)
  }, [email, reset])

  // const watchAllFields = watch();
  
  // React.useEffect(() => {
  //   if (!isEmpty(dirtyFields)) {
  //     onSubmit(watchAllFields)
  //   }
  // }, [dirtyFields, onSubmit, watchAllFields]
  // )
  

  return (
    <>
      <FormProvider {...formReturn}>
        <Flex className="container relative">
          <Flex className="flex-1">
            <div className="w-full">
              <div className="mx-auto py-4 lg:max-w-2xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <PersonalDetailsSection />
                  <WorkExperienceSection />
                  <EducationSection />
                  <ProjectSection />
                  <CertificateSection />
                  <ReferenceSection />
                </form>
              </div>
            </div>
          </Flex>
          {/* <Flex className="sticky right-0 top-12 h-screen flex-1 p-4">
            {templateHtml ? <div className="w-full" dangerouslySetInnerHTML={{__html: templateHtml}}/> : null}
          </Flex> */}
        </Flex>
      </FormProvider>
      <FormDevTool control={formReturn.control} />
    </>
  );
};
