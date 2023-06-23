'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { CVSchema } from './schema';
import { CvFormValues } from './types';
import { updateResume } from './actions';
import { ResumeForm } from './ResumeForm';
import { Flex } from '@/components/ui/Flex';
import { ResumePreview } from './ResumePreview';

type ResumeEditorProps = {
  defaultValues?: CvFormValues
  email?: string | null
  templateHtml?: string
}

export const ResumeEditor = ({ defaultValues, email, templateHtml }: ResumeEditorProps) => {
  console.log("🚀 ~ file: ResumeEditor.tsx:22 ~ ResumeEditor ~ defaultValues:", defaultValues)
  const [isFormChanged, setIsFormChanged ] = React.useState(false)
  const [isPendingUpdateTemplate, startUpdateTemplateTransition] = React.useTransition()
  const shouldRefetchTemplate = isFormChanged && !isPendingUpdateTemplate

  const formReturn = useForm<CvFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CVSchema),
  });
  const { watch } = formReturn

  const handleDebounceUpdateResume = (data: CvFormValues) => {
    if (!email || !data) {
      return
    }
    startUpdateTemplateTransition(() => {
      updateResume(email, data)
      setIsFormChanged(true)
    })
  }

  const debounceUpdateResume = React.useCallback(debounce(handleDebounceUpdateResume, 100), []);

  React.useEffect(() => {
    const watchSubscribe = watch((data) => {
      debounceUpdateResume(data as CvFormValues)
    })
    return () => {
      watchSubscribe.unsubscribe()
    }
  }, [debounceUpdateResume, watch])

  return (
    <Flex className="container relative">
      <Flex className="flex-1">
        <div className="w-full">
          <div className="mx-auto py-4 lg:max-w-2xl">
            <FormProvider {...formReturn}>
              <ResumeForm />
            </FormProvider>
          </div>
        </div>
      </Flex>
      <Flex className="sticky right-0 top-12 h-screen flex-1 p-4">
        <ResumePreview resumeHtmlData={templateHtml} shouldRefetchTemplate={shouldRefetchTemplate}/>
      </Flex>
    </Flex>
  );
};
