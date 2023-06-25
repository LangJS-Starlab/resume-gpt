import React from 'react';
import { useResumeTemplate } from '@/lib/queries';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

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
    <div  className="relative h-full w-full overflow-y-auto">
      <div dangerouslySetInnerHTML={{__html: resumeHtml}}/>
      <Link
        href="/resume/download"
        target="_blank"
        rel="noreferrer"
        className='absolute right-0 top-4'
      >
        <div
          className={buttonVariants({
            variant: "outline"
          })}
        >
          Download PDF
        </div>
      </Link>
    </div>
  );
}