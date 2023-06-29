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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type ResumeEditorProps = {
  defaultValues?: ResumeFormValues
  templateHtml?: string
}

const REFETCH_RESUME_DETAILS_INTERVAL = 4000

export const ResumeEditor = ({ defaultValues, templateHtml }: ResumeEditorProps) => {
  const [isPendingUpdateTemplate, startUpdateTemplateTransition] = React.useTransition()
  const formReinitialized = React.useRef(false)
  const [resumeTemplate, setResumeTemplate] = React.useState(templateHtml)

  const { data: resumeDetails } = useResumeDetails({
    enabled: isEmpty(defaultValues),
    refetchInterval: (data) => {
      return !data ? REFETCH_RESUME_DETAILS_INTERVAL : false
    },
  })

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
  }, [defaultValues, reset, resumeDetails])


  const handleDebounceUpdateResume = (data: ResumeFormValues) => {
    if (!data) {
      return
    }
    startUpdateTemplateTransition(async () => {
      const newData = await updateResume(data)
      setResumeTemplate(newData.templateHtml)
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
    <Flex className="container relative p-2 lg:p-4">
      <Flex className="flex-1">
        <div className="w-full">
          <div className="mx-auto lg:max-w-2xl lg:py-4">
            <FormProvider {...formReturn}>
              <ResumeForm />
            </FormProvider>
          </div>
        </div>
      </Flex>
      <Flex className="sticky right-0 top-12 hidden h-screen flex-1 p-4 lg:block">
        <ResumePreview resumeHtmlData={resumeTemplate} isLoading={isPendingUpdateTemplate}/>
      </Flex>

      <Sheet>
        <SheetTrigger  className={cn(buttonVariants({
          size: "sm",
          variant: "default",
        }), 'fixed bottom-2 right-4 block lg:hidden')}>
          Preview Resume
        </SheetTrigger>
        <SheetContent className='w-full'>
          <ResumePreview resumeHtmlData={resumeTemplate} isLoading={isPendingUpdateTemplate}/>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!defaultValues && !resumeDetails}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>Your resume is being generated</AlertDialogTitle>
            <AlertDialogDescription className='flex flex-col items-center justify-center text-center'>
              <p>We are analyzing your Github profile data and generating the resume.</p>
              <p>This may take a few seconds.</p>
              <Icons.spinner className="mr-2 mt-4 h-4 w-4 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};
