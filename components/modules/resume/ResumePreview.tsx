import React from 'react';
import { useResumeTemplate } from '@/lib/queries';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { Flex } from '@/components/ui/Flex';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Icons } from '@/components/Icons';

type ResumePreviewProps = {
  resumeHtmlData?: string
  shouldRefetchTemplate: boolean
}

export const ResumePreview = ({ resumeHtmlData, shouldRefetchTemplate }: ResumePreviewProps) => {
  const { data, isRefetching, refetch } = useResumeTemplate({
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
      <Flex justify="end" className='absolute right-2 top-4 mb-2'>
        <Link
          href="/resume/download"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
            })}
          >
            <Icons.download size={22} className="mr-2 h-4 w-4" />
          Download PDF
          </div>
        </Link>
        {
          isRefetching && (
            <Icons.spinner size={22} className="absolute left-0 top-4 mr-2 h-4 w-4 animate-spin" />
          )
        }
      </Flex>
      <div dangerouslySetInnerHTML={{__html: resumeHtml}}/>
    </ScrollArea>
  );
}