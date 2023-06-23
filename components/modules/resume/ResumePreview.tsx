import { useResumeTemplate } from '@/lib/queries';
import React from 'react';

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
    <div className="w-full" dangerouslySetInnerHTML={{__html: resumeHtml}}/>
  );
}