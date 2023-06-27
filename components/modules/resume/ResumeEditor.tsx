'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { ResumeSchema } from './schema';
import { ResumeFormValues } from './types';
import { updateResume } from './actions';
import { ResumeForm } from './ResumeForm';
import { Flex } from '@/components/ui/Flex';
import { ResumePreview } from './ResumePreview';
import { useResumeDetails, useResumeTemplate } from '@/lib/queries';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/AlertDialog';
import { Icons } from '@/components/Icons';
import { UserId } from '@/types/next-auth';

type ResumeEditorProps = {
  defaultValues?: ResumeFormValues
  userId?: UserId
  templateHtml?: string
}

export const ResumeEditor = ({ defaultValues, userId, templateHtml }: ResumeEditorProps) => {
  const [isFormChanged, setIsFormChanged ] = React.useState(false)
  const [isPendingUpdateTemplate, startUpdateTemplateTransition] = React.useTransition()
  const formReinitialized = React.useRef(false)

  const { data: resumeDetails } = useResumeDetails({
    enabled: isEmpty(defaultValues),
    refetchInterval: (data) => {
      return !data ? 1000 : false
    },
  })
  const shouldRefetchTemplate = isFormChanged && !isPendingUpdateTemplate

  const formReturn = useForm<ResumeFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(ResumeSchema),
  });

  const { watch, reset } = formReturn

  React.useEffect(() => {
    if (resumeDetails && !formReinitialized.current && isEmpty(defaultValues)) {
      reset(resumeDetails)
      formReinitialized.current = true
    }
  }, [reset, resumeDetails])


  const handleDebounceUpdateResume = (data: ResumeFormValues) => {
    if (!userId || !data) {
      return
    }
    startUpdateTemplateTransition(() => {
      updateResume(data, userId)
      setIsFormChanged(true)
    })
  }

  const debounceUpdateResume = React.useCallback(debounce(handleDebounceUpdateResume, 300), []);

  React.useEffect(() => {
    const watchSubscribe = watch((data) => {
      debounceUpdateResume(data as ResumeFormValues)
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

      <AlertDialog open={!defaultValues && !resumeDetails}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>Your resume is being generated</AlertDialogTitle>
            <AlertDialogDescription className='flex flex-col items-center justify-center text-center'>
              <p>We are anylizing your Github profile data and generating the resume.</p>
              <p>This may take a few seconds.</p>
              <Icons.spinner className="mr-2 mt-4 h-4 w-4 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};
