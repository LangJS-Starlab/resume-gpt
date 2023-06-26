import React from 'react';
import { useResumeTemplate } from '@/lib/queries';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { Flex } from '@/components/ui/Flex';
import { ScrollArea } from '@/components/ui/ScrollArea';

type ResumePreviewProps = {
  resumeHtmlData?: string
  shouldRefetchTemplate: boolean
}

export const ResumePreview = ({ resumeHtmlData, shouldRefetchTemplate }: ResumePreviewProps) => {
  const { data, isLoading, refetch } = useResumeTemplate({
    enabled: shouldRefetchTemplate
  })
  const resumeHtml = data?.data || resumeHtmlData

  React.useEffect(() => {
    if (!shouldRefetchTemplate) {
      return
    }

    refetch()
  }, [shouldRefetchTemplate, refetch])

  if (!resumeHtml) {
    return null
  }

  return (
    <ScrollArea  className="relative h-full w-full">
      <Flex justify="end" className='mb-2'>
        <Link
          href="/resume/download"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
          Download PDF
          </div>
        </Link>
      </Flex>
      <div dangerouslySetInnerHTML={{__html: resumeHtml}}/>
    </ScrollArea>
  );
}